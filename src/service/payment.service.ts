import { Injectable, HttpService, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ModuleRef } from '@nestjs/core';
import * as uuid from 'uuid/v4';
import { BookingRepository } from './../repository/booking.repository';
import {
  RequestMomoATM,
  ResponseSideMomoAfterFirstRequestATM,
  ResponseSideMomoAfterFirstRequestAIO,
  NotifyUrlBodySideMomo,
  NotifyUrlSideServer,
  RequestMomoAIO,
  OptionsQueryPayment,
} from './../interface/payment.interface';
import {
  RequestPaymentMomoATM,
  RequestPaymentMomoAIO,
  PaymentInfoDto,
} from './../dto/payment.dto';
import { ConfigService } from './../config/config.service';
import { PaymentAttribute } from './../interface/attribute.interface';
import { PaymentRepository } from './../repository/payment.repository';
import { createQrCodeAndSave } from '../helper/tools/file';
import * as PaymentUtils from '../helper/utils/payment';
import { GetFullDate } from '../helper/utils/date';
import { SportCenterEquipmentBooking } from '../entity/SportCenterEquipmentBooking.entity';
import { Payment } from './../entity/Payment.entity';
import * as querystring from 'qs';

@Injectable()
export class PaymentService implements OnModuleInit {
  private logger = new Logger('PaymentService', true);
  public schedule: SchedulerRegistry;

  constructor(
    public readonly paymentRepository: PaymentRepository,
    public readonly bookingRepository: BookingRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    this.schedule = await this.moduleRef.create(SchedulerRegistry);
  }

  async requestPaymentMomo(
    body: RequestMomoATM | RequestMomoAIO,
    requestData: RequestPaymentMomoATM | RequestPaymentMomoAIO,
  ): Promise<
    ResponseSideMomoAfterFirstRequestATM | ResponseSideMomoAfterFirstRequestAIO
  > {
    const notifyUrlPath = '/api/rotoya/payment/momo/notifyUrl';
    body.partnerCode = this.configService.get('MOMO_PARTNER_CODE');
    body.accessKey = this.configService.get('MOMO_ACCESS_KEY');
    body.orderId = uuid();
    if (body instanceof RequestMomoATM)
      body.bankCode = (requestData as RequestPaymentMomoATM).bankCode;
    body.amount = requestData.amount + '';
    body.requestId = requestData.orderId;
    body.orderInfo = 'kuribboh';
    body.extraData = 'email=huhu@gmail.com';
    body.returnUrl = requestData.returnUrl;
    body.notifyUrl = this.configService.get('PUBLIC_HOST')
      ? this.configService.get('PUBLIC_HOST') + notifyUrlPath
      : this.configService.get('PUBLIC_HOSTNAME') +
        ':' +
        this.configService.get('PORT_LISTEN') +
        notifyUrlPath;

    body.signature = PaymentUtils.getSignature(
      body,
      this.configService.get('MOMO_SECRET_KEY'),
      body instanceof RequestMomoAIO ? ['requestType'] : null,
    );

    console.log(body);

    const res = await this.httpService
      .post(
        this.configService.get('MOMO_API_HOSTNAME') +
          '/gw_payment/transactionProcessor',
        body,
      )
      .toPromise();
    console.log(res.data);
    if (res.status >= 400) return;
    return res.data;
  }

  async requestPaymentMomoATM(
    requestData: RequestPaymentMomoATM,
  ): Promise<ResponseSideMomoAfterFirstRequestATM> {
    var body = new RequestMomoATM();
    if (!PaymentUtils.checkBankCode(requestData.bankCode)) return;
    return this.requestPaymentMomo(body, requestData);
  }

  async requestPaymentMomoAIO(
    requestData: RequestPaymentMomoAIO,
  ): Promise<ResponseSideMomoAfterFirstRequestAIO> {
    var body = new RequestMomoAIO();
    return this.requestPaymentMomo(body, requestData) as Promise<
      ResponseSideMomoAfterFirstRequestAIO
    >;
  }

  async responseNotifyUrlMomo(
    requestData: NotifyUrlBodySideMomo,
  ): Promise<NotifyUrlSideServer> {
    var body = new NotifyUrlSideServer();
    body.partnerCode = requestData.partnerCode;
    body.accessKey = requestData.accessKey;
    body.requestId = requestData.requestId;
    body.orderId = requestData.orderId;
    body.errorCode = requestData.errorCode;
    body.message = requestData.message;
    body.responseTime = requestData.responseTime;
    body.extraData = requestData.extraData;
    body.signature = PaymentUtils.getSignature(
      body,
      this.configService.get('MOMO_SECRET_KEY'),
    );

    try {
      if (+requestData.errorCode) {
        await this.rollBackBooking(requestData.requestId);
      } else {
        await this.acceptBooking(requestData.requestId, requestData.transId);
      }
    } catch (e) {
      this.logger.error(e);
    }

    return body;
  }

  async rollBackBooking(orderId: string) {
    const payment = await this.getPaymentInfoByOrderId(orderId);
    try {
      this.schedule.deleteTimeout(orderId);
    } catch (e) {
      this.logger.error(e);
    }
    if (!payment)
      throw new Error(`payment with orderId = ${orderId} not found`);
    if (payment.transactionId) {
      this.logger.error(
        `Can't rollback because transactionId available with paymentId = ${payment.id}`,
      );
      return;
    }
    await Promise.all(
      payment.bookings.map(booking => {
        if (booking.sportCenterEquipmentBookings) {
          return this.bookingRepository
            .getRepository<SportCenterEquipmentBooking>(
              'sport_center_equipment_booking',
            )
            .remove(booking.sportCenterEquipmentBookings);
        }
      }),
    );
    await this.bookingRepository.remove(payment.bookings);
    await this.paymentRepository.remove(payment);
  }

  async acceptBooking(orderId: string, transactionId: string) {
    try {
      this.schedule.deleteTimeout(orderId);
    } catch (e) {
      this.logger.error(e);
    }
    const payment = await this.getPayment({ orderId });
    if (!payment) {
      throw new Error(`payment with orderId = ${orderId} not found`);
    }
    const qrcodeData = {} as any;
    qrcodeData.orderId = payment.orderId;
    await createQrCodeAndSave(
      this.configService.get('path_file_upload'),
      orderId,
      JSON.stringify(qrcodeData),
    );
    await this.paymentRepository.update({ id: payment.id }, { transactionId });
  }

  async insertPayment(paymentAttribute: PaymentAttribute) {
    return this.paymentRepository.insert(paymentAttribute);
  }

  async getPayment(paymentAttr: PaymentAttribute, joins?: string[]) {
    return this.paymentRepository.getOneByOptions(paymentAttr, joins);
  }

  async getPaymentInfoByOrderId(orderId: string) {
    return this.paymentRepository.getPaymentInfo(orderId);
  }

  async getPayments(opts?: OptionsQueryPayment) {
    const payments = await this.paymentRepository.getPayments(opts);
    if (payments.length == 2 && !isNaN(+payments[1]))
      return [
        (payments[0] as Payment[]).map(payment => new PaymentInfoDto(payment)),
        payments[1],
      ];
    return (payments as Payment[]).map(payment => new PaymentInfoDto(payment));
  }

  async getPaymentByTimeSlotId(timeSlotId: number, time?: number) {
    const bookingDate = GetFullDate(time || new Date());
    const payments = await this.paymentRepository.getPaymentByTimeSlotId(
      timeSlotId,
      bookingDate,
    );
    return payments.map(payment => new PaymentInfoDto(payment));
  }

  async getPaymentBySportCenterId(
    sportCenterId: number,
    startDate: number,
    endDate: number,
  ) {
    const startDate_temp = GetFullDate(startDate);
    const endDate_temp = GetFullDate(endDate);
    return this.paymentRepository.getPaymentBySportCenterId(
      sportCenterId,
      startDate_temp,
      endDate_temp,
    );
  }

  async requestPaymentVnpayATM(
    requestData: RequestPaymentMomoATM,
    headers: any,
  ) {
    var ipAddr = headers['x-forwarded-for'] || '172.16.68.68';
    var tmnCode = 'B9SUBZUX';
    var secretKey = 'PHGRRLVSAKJSEFVUYYANCZOIOYUGJTYH';
    var vnpUrl = 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    var returnUrl = requestData.returnUrl; //|| this.configService.get('PUBLIC_HOST') + '/atm-inland-vnpay';
    var date = new Date();
    var orderId = requestData.orderId;
    var amount = requestData.amount;
    var bankCode = requestData.bankCode;
    var orderInfo = 'Rotoya đặt lịch';
    var orderType = 'topup';
    var locale = 'vn';
    var currCode = 'VND';
    var vnp_Params = {};

    vnp_Params['vnp_Version'] = '2';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = 20190829103111 || date.getTime();
    vnp_Params['vnp_BankCode'] = bankCode;

    vnp_Params = this.sortObject(vnp_Params);

    var signData =
      secretKey + querystring.stringify(vnp_Params, { encode: false });

    var secureHash = PaymentUtils.hashSHA256(signData);

    vnp_Params['vnp_SecureHashType'] = 'SHA256';
    vnp_Params['vnp_SecureHash'] = secureHash;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });
    return vnpUrl;
  }

  sortObject(o) {
    var sorted = {},
      key,
      a = [];

    for (key in o) {
      if (o.hasOwnProperty(key)) {
        a.push(key);
      }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
      sorted[a[key]] = o[a[key]];
    }
    return sorted;
  }

  async updateTransaction(transactionId: any, orderId: string) {
    await this.acceptBooking(orderId, transactionId);
  }
}
