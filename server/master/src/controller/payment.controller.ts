import { PaymentService } from './../service/payment.service';
import { BookSportGroundBody } from './../dto/book.dto';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService
  ) { }

//   @Post('bookSportGround')
//   async bookSportGround(@Body() book: BookSportGroundBody) {
//     const qrCode = await this.paymentService.bookSportGround(book);
//     return qrCode;
//   }

  // @Get('test')
  // async test() {
  //   const data = await this.bookingService.createQrCode();
  //   return data;
  // }
}
