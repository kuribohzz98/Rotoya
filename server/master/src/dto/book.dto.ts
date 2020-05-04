import { DtoMapper, MapFrom } from './../base/BaseDtoMapper';
import { ApiProperty } from '@nestjs/swagger';
import { BookSportGround, BookData } from '../interface/booking.interface';

class BookDataDto implements BookData {
    @ApiProperty()
    timeSlotId: number;

    @ApiProperty({ default: new Date().getTime() })
    bookingDate: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    equipments?: any[];
}

export class BookSportGroundBody implements BookSportGround {

    @ApiProperty()
    userId: number;

    @ApiProperty()
    sportCenterId: number;

    @ApiProperty()
    bookDatas: BookDataDto[];

}

export class BookingDto extends DtoMapper {
    @MapFrom()
    id: number;

    @MapFrom() 
    timeSlotId:number;

    @MapFrom()
    paymentId:number;

    @MapFrom()
    bookingDate: string;

    @MapFrom()
    detail: any;

    @MapFrom()
    equipment: any;
}
