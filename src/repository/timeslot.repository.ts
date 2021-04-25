import { SportGroundTimeSlotAttribute } from './../interface/attribute.interface';
import { Booking } from './../entity/Booking.entity';
import { SportGroundTimeSlot } from './../entity/SportGroundTimeSlot.entity';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from 'typeorm';

@EntityRepository(SportGroundTimeSlot)
export class TimeSlotRepository extends BaseRepository<
  SportGroundTimeSlot,
  SportGroundTimeSlotAttribute
> {
  getTimeSlotByDateBook(id: number, dateBook: string) {
    const timeSlot = this.models.sport_ground_time_slot;
    const sportGround = this.models.sport_ground;
    const booking = this.models.booking;
    return (
      this.createQueryBuilder(timeSlot)
        .leftJoinAndMapOne(
          `${timeSlot}.sportGround`,
          sportGround,
          sportGround,
          `${sportGround}.id = ${timeSlot}.sportGroundId`,
        )
        // .leftJoinAndMapMany(`${timeSlot}.bookings`, booking, booking, `${booking}.timeSlotId = ${timeSlot}.id`)
        .leftJoinAndMapMany(
          `${timeSlot}.bookings`,
          qb => {
            return qb
              .select()
              .addFrom<Booking>('Booking', booking)
              .where(`${booking}.bookingDate LIKE :dateBook`, {
                dateBook: dateBook + '%',
              });
          },
          booking,
          `${booking}.timeSlotId = ${timeSlot}.id`,
        )
        .where(`${timeSlot}.id = :id`, { id })
        // .andWhere(`${booking}.bookingDate LIKE :dateBook`, { dateBook: dateBook + '%' })
        .getRawAndEntities()
    );
  }
}
