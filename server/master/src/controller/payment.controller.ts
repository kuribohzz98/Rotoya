import { ResponseSideMomoAfterFirstRequest, NotifyUrlBodySideMomo, NotifyUrlSideServer } from './../interface/payment.interface';
import { mergeMap } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { RequestPaymentMomoAtm } from './../dto/payment.dto';
import { PaymentService } from './../service/payment.service';
import { BookSportGroundBody } from './../dto/book.dto';
import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  private logger: Logger = new Logger('PaymentController');
  constructor(
    private readonly paymentService: PaymentService
  ) { }

  //   @Post('bookSportGround')
  //   async bookSportGround(@Body() book: BookSportGroundBody) {
  //     const qrCode = await this.paymentService.bookSportGround(book);
  //     return qrCode;
  //   }

  @Post('momo/notifyUrl')
  notifyUrl$(@Body() body: NotifyUrlBodySideMomo): Observable<NotifyUrlSideServer> {
    this.logger.log(body, 'PaymentController:notifyUrl');
    return of(body)
      .pipe(
        mergeMap(body => from(this.paymentService.responseNotifyUrlMomo(body)))
      )
  }

  @Post('atm-inland')
  atmInland$(@Body() body: RequestPaymentMomoAtm): Observable<ResponseSideMomoAfterFirstRequest> {
    return of(body)
      .pipe(
        mergeMap(body => from(this.paymentService.requestPaymentMomoAtm(body)))
      )
  }
}
