import { TypeQueryGetSportCenter } from '../interface/sport.interface';
import { TypePositionMapAndDistance } from './../interface/map.interface';
import { TypeQueryGetSportCenters } from './../interface/sport.interface';
import { OptionsFilterTimeSlotBlank } from './../interface/repository.interface';
import { HAVERSINE } from './../constants/map.constants';
import { Booking } from './../entity/Booking.entity';
import { TypePointFourDirection } from '../interface/map.interface';
import { SportCenter } from '../entity/SportCenter.entity';
import { SportCenterAttribute } from '../interface/attribute.interface';
import { BaseRepository } from '../base/BaseRepository';
import { EntityRepository, Brackets } from 'typeorm';

@EntityRepository(SportCenter)
export class SportCenterRepository extends BaseRepository<
  SportCenter,
  SportCenterAttribute
> {
  queryBuilderSportCenterByLocation(
    opts: TypePositionMapAndDistance,
    dataFilter: TypePointFourDirection,
  ) {
    const sportCenter = this.models.sport_center;
    return this.createQueryBuilder(sportCenter)
      .addSelect(
        `
                (${HAVERSINE.R_Earth} * acos (
                    cos ( radians(${opts.latitude}) )
                    * cos( radians(latitude ) )
                    * cos( radians(longitude ) - radians(${opts.longitude}) )
                    + sin( radians(${opts.latitude}) )
                    * sin( radians(latitude ) )
                ))`,
        `${sportCenter}_distance`,
      )
      .where(`${sportCenter}.latitude <= :pointN`, {
        pointN: dataFilter.pointNorth.latitude,
      })
      .andWhere(`${sportCenter}.latitude >= :pointS`, {
        pointS: dataFilter.pointSouth.latitude,
      })
      .andWhere(`${sportCenter}.longitude <= :pointE`, {
        pointE: dataFilter.pointEast.longitude,
      })
      .andWhere(`${sportCenter}.longitude >= :pointW`, {
        pointW: dataFilter.pointWest.longitude,
      })
      .having(
        `${sportCenter}_distance ${
          opts.distance ? '<' + opts.distance : '> 0'
        }`,
      )
      .orderBy(`${sportCenter}_distance`);
  }

  async getSportCenterByGeolocation(
    query: TypeQueryGetSportCenters,
    dataFilter: TypePointFourDirection,
  ) {
    const queryBuilder = this.queryBuilderSportCenterByLocation(
      query,
      dataFilter,
    );
    const sportCenter = this.models.sport_center;
    const sport = this.models.sport;
    if (query.sportId || query.sport) {
      queryBuilder.leftJoinAndSelect(`${sportCenter}.sports`, sport);
      queryBuilder.andWhere(
        `${sport}.${query.sportId ? 'id' : 'code'} = :sport`,
        { sport: query.sportId || query.sport },
      );
    }
    if (query.name)
      queryBuilder.andWhere(`${sportCenter}.name LIKE :name`, {
        name: '%' + query.name + '%',
      });
    if (query.limit) {
      queryBuilder.limit(query.limit);
      if (query.page) queryBuilder.offset((query.page - 1) * query.limit);
    }
    return queryBuilder.getRawMany();
  }

  async getSportCenterBySlotTimeBlank(
    sportId: number,
    bookingDate: string,
    startTime: number,
    optionFilter?: OptionsFilterTimeSlotBlank,
  ) {
    const sportCenter = this.models.sport_center;
    const sportGround = this.models.sport_ground;
    const sportGroundTimeSlot = this.models.sport_ground_time_slot;
    const booking = this.models.booking;
    const query = this.createQueryBuilder(sportCenter)
      .leftJoinAndSelect(
        sportGround,
        sportGround,
        `${sportGround}.sportCenterId = ${sportCenter}.id`,
      )
      .leftJoinAndSelect(
        sportGroundTimeSlot,
        sportGroundTimeSlot,
        `${sportGroundTimeSlot}.sportGroundId = ${sportGround}.id`,
      )
      .leftJoinAndSelect(
        qb => {
          return qb
            .addSelect('COUNT(*)', 'count')
            .addSelect(`${booking}.id`)
            .addSelect(`${booking}.timeSlotId`)
            .addSelect(`${booking}.bookingDate`)
            .addFrom<Booking>('Booking', booking)
            .where(`${booking}.bookingDate LIKE :bookingDate`, {
              bookingDate: bookingDate + '%',
            })
            .groupBy(`${booking}_timeSlotId`)
            .addGroupBy(`${booking}_bookingDate`);
        },
        booking,
        `${booking}_timeSlotId = ${sportGroundTimeSlot}.id`,
      )
      .where(`${sportGround}.sportId = :sportId`, { sportId })
      .andWhere(`${sportGroundTimeSlot}.startTime >= :startTime`, { startTime })
      .andWhere(
        new Brackets(qb => {
          return qb
            .where(`count < ${sportGround}.quantity`)
            .orWhere(`count is null`);
        }),
      )
      .limit(optionFilter.limit || null)
      .offset(
        optionFilter.page && optionFilter.limit
          ? (optionFilter.page - 1) * optionFilter.limit
          : null,
      );

    if (optionFilter.pointFourDirection) {
      return query
        .addSelect(
          `
                (${HAVERSINE.R_Earth} * acos (
                    cos ( radians(${optionFilter.latitude}) )
                    * cos( radians(latitude ) )
                    * cos( radians(longitude ) - radians(${optionFilter.longitude}) )
                    + sin( radians(${optionFilter.latitude}) )
                    * sin( radians(latitude ) )
                ))`,
          `${sportCenter}_distance`,
        )
        .andWhere(`${sportCenter}.latitude <= :pointN`, {
          pointN: optionFilter.pointFourDirection.pointNorth.latitude,
        })
        .andWhere(`${sportCenter}.latitude >= :pointS`, {
          pointS: optionFilter.pointFourDirection.pointSouth.latitude,
        })
        .andWhere(`${sportCenter}.longitude <= :pointE`, {
          pointE: optionFilter.pointFourDirection.pointEast.longitude,
        })
        .andWhere(`${sportCenter}.longitude >= :pointW`, {
          pointW: optionFilter.pointFourDirection.pointWest.longitude,
        })
        .having(`${sportCenter}_distance < ${optionFilter.distance}`)
        .orderBy(`${sportCenter}_distance`)
        .getRawMany();
    }
    return query.getRawMany();
  }

  async getSportCenters(
    query: TypeQueryGetSportCenters = {} as TypeQueryGetSportCenters,
  ) {
    const sportCenter = this.models.sport_center;
    const sport = this.models.sport;
    const queryBuilder = this.createQueryBuilder(sportCenter);
    if (query.sportId || query.sport) {
      queryBuilder.leftJoinAndSelect(`${sportCenter}.sports`, sport);
      queryBuilder.where(`${sport}.${query.sportId ? 'id' : 'code'} = :sport`, {
        sport: query.sportId || query.sport,
      });
      query.userId &&
        queryBuilder.andWhere(`${sportCenter}.userId = :userId`, {
          userId: +query.userId,
        });
    } else {
      query.userId &&
        queryBuilder.where(`${sportCenter}.userId = :userId`, {
          userId: +query.userId,
        });
    }
    if (query.limit) {
      queryBuilder.limit(query.limit);
      if (query.page) queryBuilder.offset((query.page - 1) * query.limit);
    }
    return queryBuilder.getMany();
  }

  async getSportCenter(opts: TypeQueryGetSportCenter) {
    const sportCenter = this.models.sport_center;
    const sport = this.models.sport;
    const sportGround = this.models.sport_ground;
    const sportGroundTimeSlot = this.models.sport_ground_time_slot;
    const sportEquipment = this.models.sport_equipment;
    const scEquipment = this.models.sport_center_equipment;
    const booking = this.models.booking;
    const sc_favorite = this.models.sport_center_favorite;
    const sceBooking = this.models.sport_center_equipment_booking;
    const qb = this.createQueryBuilder(sportCenter)
      .leftJoinAndMapMany(
        `${sportCenter}.sportGrounds`,
        sportGround,
        sportGround,
        `${sportCenter}.id = ${sportGround}.sportCenterId`,
      )
      .leftJoinAndMapMany(
        `${sportCenter}.sportCenterFavorites`,
        sc_favorite,
        sc_favorite,
        `${sportCenter}.id = ${sc_favorite}.sportCenterId`,
      )
      .leftJoinAndMapMany(
        `${sportCenter}.sportCenterEquipments`,
        scEquipment,
        scEquipment,
        `${sportCenter}.id = ${scEquipment}.sportCenterId`,
      )
      .leftJoinAndMapOne(
        `${scEquipment}.sportEquipment`,
        sportEquipment,
        sportEquipment,
        `${scEquipment}.sportEquipmentId = ${sportEquipment}.id`,
      )
      .leftJoinAndMapMany(
        `${sportGround}.sportGroundTimeSlots`,
        sportGroundTimeSlot,
        sportGroundTimeSlot,
        `${sportGround}.id = ${sportGroundTimeSlot}.sportGroundId`,
      )
      .leftJoinAndSelect(`${sportCenter}.sports`, sport)
      .where(`${sportCenter}.id = :id`, { id: +opts.id });

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

  async getSportCentersFavorites(userId: number): Promise<SportCenter[]> {
    const sportCenter = this.models.sport_center;
    const sc_favorite = this.models.sport_center_favorite;
    return this.createQueryBuilder(sportCenter)
      .leftJoinAndMapMany(
        `${sportCenter}.sportCenterFavorites`,
        sc_favorite,
        sc_favorite,
        `${sportCenter}.id = ${sc_favorite}.sportCenterId`,
      )
      .where(`${sc_favorite}.userId = :userId`, { userId })
      .getMany();
  }
}
