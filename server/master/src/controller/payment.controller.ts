import { PaymentAttribute } from './../interface/attribute.interface';
import { Controller, Get, Post, Body, Logger, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { mergeMap } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import {
  ResponseSideMomoAfterFirstRequestATM,
  NotifyUrlBodySideMomo,
  NotifyUrlSideServer,
  ResponseSideMomoAfterFirstRequestAIO,
  OptionsQueryPayment
} from './../interface/payment.interface';
import { RequestPaymentMomoATM, RequestPaymentMomoAIO } from './../dto/payment.dto';
import { PaymentService } from './../service/payment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  private logger: Logger = new Logger('PaymentController');
  constructor(
    private readonly paymentService: PaymentService
  ) { }

  @Post('momo/notifyUrl')
  notifyUrl$(@Body() body: NotifyUrlBodySideMomo): Observable<NotifyUrlSideServer> {
    this.logger.log(body, 'PaymentController:notifyUrl');
    return of(body)
      .pipe(
        mergeMap(body => from(this.paymentService.responseNotifyUrlMomo(body)))
      )
  }

  @Post('atm-inland')
  atmInland$(@Body() body: RequestPaymentMomoATM): Observable<ResponseSideMomoAfterFirstRequestATM> {
    return of(body)
      .pipe(
        mergeMap(body => from(this.paymentService.requestPaymentMomoATM(body)))
      )
  }

  @Post('momo')
  momoPayment$(@Body() body: RequestPaymentMomoAIO): Observable<ResponseSideMomoAfterFirstRequestAIO> {
    return of(body)
      .pipe(
        mergeMap(body => from(this.paymentService.requestPaymentMomoAIO(body)))
      )
  }

  @Get('get-one')
  @ApiQuery({name: 'id', type: 'number', required: false})
  @ApiQuery({name: 'orderId', type: 'string', required: false})
  @ApiQuery({name: 'transactionId', type: 'string', required: false})
  getOne(@Query() query: PaymentAttribute) {
    return of(query)
    .pipe(
      mergeMap(query => from(this.paymentService.getPaymentInfo(query)))
    )
  }

  @Get()
  getPayments(@Query() query: OptionsQueryPayment) {
    return of(query)
    .pipe(
      mergeMap(query => from(this.paymentService.getPayments(query)))
    )
  }
}
