import { ApiProperty } from '@nestjs/swagger';
import { BookSportGround } from '../interface/booking.interface';

export class BookSportGroundBody implements BookSportGround {
    @ApiProperty({default: 1})
    userId: number;

    @ApiProperty()
    sportGroundId: number;

    @ApiProperty()
    timeSlotId: number;

    @ApiProperty({default: new Date().getTime()})
    bookingDate: number;

    @ApiProperty({required: false})
    equipment?: Object;
}