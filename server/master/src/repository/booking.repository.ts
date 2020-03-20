import { OptionsPaging } from './../interface/repository.interface';
import { BookingAttribute } from './../interface/attribute.interface';
import { Booking } from './../entity/Booking.entity';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from "typeorm";

@EntityRepository(Booking)
export class BookingRepository extends BaseRepository<Booking, BookingAttribute>  {
    /**
     * 
     * @param userId 
     * @param options
     * {
     *      limit: total element of one page,
     *      page: page want get 
     * }
     * @returns Promise<Booking[]> 
     */
    async getBookingByUserHasPaging(
        userId: number,
        options?: OptionsPaging
    ): Promise<Booking[]> {
        return this.getByOptions({ }, ['payment'], {
            order: {
                createdAt: 'DESC'
            },
            take: options && options.limit ? options.limit : null,
            skip: options && options.limit && options.page ? (options.page - 1) * options.limit : null
        });
    }

    async getBooking(id: number) {
        return this.getOneByOptions({ id }, ['payment']);
    }
}