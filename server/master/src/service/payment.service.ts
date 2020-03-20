import { BookingRepository } from './../repository/booking.repository';
import { RequestMomoAtm, ResponseSideMomoAfterFirstRequest, NotifyUrlBodySideMomo, NotifyUrlSideServer } from './../interface/payment.interface';
import { Injectable, HttpService } from '@nestjs/common';
import { RequestPaymentMomoAtm } from './../dto/payment.dto';
import { ConfigService } from './../config/config.service';
import { PaymentAttribute } from './../interface/attribute.interface';
import { PaymentRepository } from './../repository/payment.repository';
import * as uuid from 'uuid/v4';
import * as PaymentUtils from 'src/helper/utils/payment';
import { createQrCodeAndSave } from 'src/helper/tools/file';

@Injectable()
export class PaymentService {
    constructor(
        public readonly paymentRepository: PaymentRepository,
        public readonly bookingRepository: BookingRepository,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) { }

    async insertPayment(paymentAttribute: PaymentAttribute) {
        return this.paymentRepository.insert(paymentAttribute);
    }

    async requestPaymentMomoAtm(requestData: RequestPaymentMomoAtm): Promise<ResponseSideMomoAfterFirstRequest> {
        var body = new RequestMomoAtm();
        const notifyUrlPath = '/api/rotoya/payment/momo/notifyUrl';
        if (!PaymentUtils.checkBankCode(requestData.bankCode)) return;
        body.partnerCode = this.configService.get('MOMO_PARTNER_CODE');
        body.accessKey = this.configService.get('MOMO_ACCESS_KEY');
        body.requestId = requestData.orderId;
        body.bankCode = requestData.bankCode;
        body.amount = requestData.amount + "";
        body.orderId = body.requestId;
        body.orderInfo = "zz";
        body.extraData = "email=kuribohzz98@gmail.com"
        body.returnUrl = requestData.returnUrl;
        body.notifyUrl = this.configService.get('PUBLIC_HOST')
            ? this.configService.get('PUBLIC_HOST') + notifyUrlPath
            : this.configService.get('PUBLIC_HOSTNAME') + ':' + this.configService.get('PORT_LISTEN') + notifyUrlPath;

        body.signature = PaymentUtils.getSignature(body, this.configService.get('MOMO_SECRET_KEY'));
        const res = await this.httpService
            .post(this.configService.get('MOMO_API_HOSTNAME') + '/gw_payment/transactionProcessor', body)
            .toPromise();
        console.log(res);
        if (res.status != 200) return;
        return res.data as ResponseSideMomoAfterFirstRequest;
    }

    async responseNotifyUrlMomo(requestData: NotifyUrlBodySideMomo): Promise<NotifyUrlSideServer> {
        var body = new NotifyUrlSideServer();
        body.partnerCode = requestData.partnerCode;
        body.accessKey = requestData.accessKey;
        body.requestId = requestData.requestId;
        body.orderId = requestData.orderId;
        body.errorCode = requestData.errorCode;
        body.message = requestData.message;
        body.responseTime = requestData.responseTime;
        body.extraData = requestData.extraData;
        body.signature = PaymentUtils.getSignature(body, this.configService.get('MOMO_SECRET_KEY'));

        if (+requestData.errorCode) {
            await this.rollBackBooking(requestData.orderId);
        } else {
            await this.acceptBooking(requestData.orderId, requestData.transId);
        }
        return body;
    }

    async rollBackBooking(orderId: string) {
        const payment = await this.getPaymentByOrderId(orderId);
        if (!payment) throw new Error(`payment with orderId = ${orderId} not found`);
        await this.bookingRepository.remove(payment.bookings);
        await this.paymentRepository.remove(payment);
    }

    async acceptBooking(orderId: string, transactionId: string) {
        const payment = await this.getPaymentByOrderId(orderId);
        if (!payment) {
            throw new Error(`payment with orderId = ${orderId} not found`);
        }
        const qrcodeData = {} as any;
        qrcodeData.paymentId = payment.id;
        await createQrCodeAndSave(this.configService.get('path_qrcode'), orderId, JSON.stringify(qrcodeData));
        await this.paymentRepository.update({ id: payment.id }, { transactionId });
    }

    async getPaymentByOrderId(orderId: string) {
        return this.paymentRepository.getPaymentByOrderId(orderId);
    }


}
