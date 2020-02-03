import { BookSportGroundBody } from './../dto/book.dto';
import { BookingService } from './../service/booking.service';
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService
  ) { }

  @Post('bookSportGround')
  async bookSportGround(@Body() book: BookSportGroundBody) {
    const qrCode = await this.bookingService.bookSportGround(book);
    return qrCode;
  }

  @Get('getBookingByUser')
  @ApiQuery({name: 'page', required: false})
  @ApiQuery({name: 'limit', required: false})
  @ApiQuery({name: 'userId'})
  async getBookingByUser(@Query() query: {userId?: number, limit?: number, page?: number}) {
    const data = await this.bookingService.getBookingByUser(query.userId);
    return data;
  }
}
