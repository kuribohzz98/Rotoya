import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BookSportGroundBody } from './../dto/book.dto';
import { BookingService } from './../service/booking.service';
import { cloneFilterObject } from './../helper/utils/common';

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
      subject$.next(cloneFilterObject(data, ['id']));
    });
    return subject$.pipe(take(1));
  }

  @Post('roll-back')
  async rollBackBooking(@Body() body: { orderId: string }) {
    await this.bookingService.paymentService.rollBackBooking(body.orderId);
    return;
  }
}
