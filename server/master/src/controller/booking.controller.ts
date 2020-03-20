import { BookSportGroundBody } from './../dto/book.dto';
import { BookingService } from './../service/booking.service';
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService
  ) { }

  @Post('bookSportGround')
  bookSportGround$(@Body() book: BookSportGroundBody) {
    const subject$ = new Subject<any>();
    this.bookingService.bookSportGround$(book).subscribe(data => {
      subject$.next(data);
    });
    return subject$.pipe(take(1));
  }

  @Get('getBookingByUser')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'userId' })
  async getBookingByUser(@Query() query: { userId?: number, limit?: number, page?: number }) {
    const data = await this.bookingService.getBookingByUser(query.userId);
    return data;
  }

  @Post('roll-back')
  async rollBackBooking(@Body() body: {orderId: string}) {
    await this.bookingService.paymentService.rollBackBooking(body.orderId);
    return;
  }
}
