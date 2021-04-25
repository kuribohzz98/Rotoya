import { PaymentAttribute } from './../interface/attribute.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { mergeMap } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import {
  ResponseSideMomoAfterFirstRequestATM,
  NotifyUrlBodySideMomo,
  NotifyUrlSideServer,
  ResponseSideMomoAfterFirstRequestAIO,
  OptionsQueryPayment,
} from './../interface/payment.interface';
import {
  RequestPaymentMomoATM,
  RequestPaymentMomoAIO,
} from './../dto/payment.dto';
import { PaymentService } from './../service/payment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  private logger: Logger = new Logger('PaymentController');
  constructor(private readonly paymentService: PaymentService) {}

  @Post('momo/notifyUrl')
  notifyUrl$(
    @Body() body: NotifyUrlBodySideMomo,
  ): Observable<NotifyUrlSideServer> {
    this.logger.log(body, 'PaymentController:notifyUrl');
    return of(body).pipe(
      mergeMap(body => from(this.paymentService.responseNotifyUrlMomo(body))),
    );
  }

  @Post('atm-inland')
  atmInland$(
    @Body() body: RequestPaymentMomoATM,
  ): Observable<ResponseSideMomoAfterFirstRequestATM> {
    return of(body).pipe(
      mergeMap(body => from(this.paymentService.requestPaymentMomoATM(body))),
    );
  }

  @Post('momo')
  momoPayment$(
    @Body() body: RequestPaymentMomoAIO,
  ): Observable<ResponseSideMomoAfterFirstRequestAIO> {
    return of(body).pipe(
      mergeMap(body => from(this.paymentService.requestPaymentMomoAIO(body))),
    );
  }

  @Get('get-one')
  @ApiQuery({ name: 'id', type: 'number', required: false })
  @ApiQuery({ name: 'orderId', type: 'string', required: false })
  // @ApiQuery({ name: 'transactionId', type: 'string', required: false })
  getOne(@Query() query: PaymentAttribute) {
    return of(query).pipe(
      mergeMap(query =>
        from(this.paymentService.getPaymentInfoByOrderId(query.orderId)),
      ),
    );
  }

  @Get()
  getPayments(@Query() query: OptionsQueryPayment) {
    return of(query).pipe(
      mergeMap(query => from(this.paymentService.getPayments(query))),
    );
  }

  @Get('info')
  @ApiQuery({ name: 'timeSlotId', type: 'number', required: true })
  @ApiQuery({ name: 'time', type: 'number', required: false })
  getPaymentInfo(@Query() query: { timeSlotId: number; time?: number }) {
    return of(query).pipe(
      mergeMap(query =>
        from(
          this.paymentService.getPaymentByTimeSlotId(
            query.timeSlotId,
            +query.time,
          ),
        ),
      ),
    );
  }

  @Get('by-sport-center-id')
  @ApiQuery({ name: 'sportCenterId', type: 'number', required: true })
  @ApiQuery({
    name: 'startDate',
    type: 'number',
    required: true,
    description: new Date().getTime().toString(),
  })
  @ApiQuery({ name: 'endDate', type: 'number', required: true })
  getPaymentBySportCenterId(
    @Query()
    query: {
      sportCenterId: number;
      startDate: number;
      endDate: number;
    },
  ) {
    return of(query).pipe(
      mergeMap(query =>
        from(
          this.paymentService.getPaymentBySportCenterId(
            +query.sportCenterId,
            +query.startDate,
            +query.endDate,
          ),
        ),
      ),
    );
  }

  @Post('atm-inland-vnpay')
  atmInlandVnpay$(
    @Body() body: RequestPaymentMomoATM,
    @Request() req: Request,
  ) {
    return of(body).pipe(
      mergeMap(body =>
        from(this.paymentService.requestPaymentVnpayATM(body, req.headers)),
      ),
    );
  }

  @Get('atm-inland-vnpay')
  atmInlandVnpayNotify$(@Query() query: any) {
    return '';
  }

  @Post('update-transaction')
  updateTransaction$(@Body() body: { transactionId: any; orderId: string }) {
    return of(body).pipe(
      mergeMap(body =>
        from(
          this.paymentService.updateTransaction(
            body.transactionId,
            body.orderId,
          ),
        ),
      ),
    );
  }
}
