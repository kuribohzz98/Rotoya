import { EntityRepository } from 'typeorm';
import { TypeQueryGetSportCenter } from './../interface/sport.interface';
import { SportGround } from './../entity/SportGround.entity';
import { SportGroundAttribute } from './../interface/attribute.interface';
import { BaseRepository } from './../base/BaseRepository';
import { Booking } from './../entity/Booking.entity';

@EntityRepository(SportGround)
export class SportGroundRepository extends BaseRepository<
  SportGround,
  SportGroundAttribute
> {
  async getSportGround(opts: TypeQueryGetSportCenter) {
    const sportCenter = this.models.sport_center;
    const sportGround = this.models.sport_ground;
    const sportGroundTimeSlot = this.models.sport_ground_time_slot;
    const sportEquipment = this.models.sport_equipment;
    const scEquipment = this.models.sport_center_equipment;
    const booking = this.models.booking;
    const sceBooking = this.models.sport_center_equipment_booking;
    const qb = this.createQueryBuilder(sportGround)
      .leftJoinAndMapOne(
        `${sportGround}.sportCenter`,
        sportCenter,
        sportCenter,
        `${sportCenter}.id = ${sportGround}.sportCenterId`,
      )
      .leftJoinAndMapMany(
        `${sportCenter}.sportCenterEquipments`,
        scEquipment,
        scEquipment,
        `${sportCenter}.id = ${scEquipment}.sportCenterId`,
      )
      .leftJoinAndMapMany(
        `${sportGround}.sportGroundTimeSlots`,
        sportGroundTimeSlot,
        sportGroundTimeSlot,
        `${sportGround}.id = ${sportGroundTimeSlot}.sportGroundId`,
      )
      .leftJoinAndMapOne(
        `${scEquipment}.sportEquipment`,
        sportEquipment,
        sportEquipment,
        `${scEquipment}.sportEquipmentId = ${sportEquipment}.id`,
      )
      .where(`${sportGround}.id = :id`, { id: +opts.id });

    if (opts.startDate && opts.endDate) {
      qb.leftJoinAndMapMany(
        `${sportGroundTimeSlot}.bookings`,
        qb => {
          return qb
            .addSelect('COUNT(*)', 'count')
            .addSelect(`${booking}.id`)
            .addSelect(`${booking}.timeSlotId`)
            .addSelect(`${booking}.bookingDate`)
            .addFrom<Booking>('Booking', booking)
            .where(`${booking}.bookingDate BETWEEN :startDate AND :endDate`, {
              startDate: opts.startDate,
              endDate: opts.endDate,
            })
            .groupBy(`${booking}_timeSlotId`)
            .addGroupBy(`${booking}_bookingDate`);
        },
        booking,
        `${booking}_timeSlotId = ${sportGroundTimeSlot}.id`,
      ).leftJoinAndMapMany(
        `${booking}.sportCenterEquipmentBookings`,
        sceBooking,
        sceBooking,
        `${sceBooking}.bookingId = ${booking}_id`,
      );
    }
    return qb.getRawAndEntities();
  }
}
