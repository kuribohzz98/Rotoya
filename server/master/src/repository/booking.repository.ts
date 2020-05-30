import { BookingAttribute } from './../interface/attribute.interface';
import { Booking } from './../entity/Booking.entity';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from "typeorm";

@EntityRepository(Booking)
export class BookingRepository extends BaseRepository<Booking, BookingAttribute>  {

    async getBooking(id: number) {
        return this.getOneByOptions({ id }, ['payment']);
    }
}