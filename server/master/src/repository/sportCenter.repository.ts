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
import { EntityRepository, Brackets } from "typeorm";

@EntityRepository(SportCenter)
export class SportCenterRepository extends BaseRepository<SportCenter, SportCenterAttribute>  {

    queryBuilderSportCenterByLocation(
        opts: TypePositionMapAndDistance,
        dataFilter: TypePointFourDirection
    ) {
        const sportCenter = this.models.sport_center;
        return this.createQueryBuilder(sportCenter)
            .addSelect(`
                (${HAVERSINE.R_Earth} * acos (
                    cos ( radians(${opts.latitude}) )
                    * cos( radians(latitude ) )
                    * cos( radians(longitude ) - radians(${opts.longitude}) )
                    + sin( radians(${opts.latitude}) )
                    * sin( radians(latitude ) )
                ))`
                , `${sportCenter}_distance`)
            .where(`${sportCenter}.latitude <= :pointN`, { pointN: dataFilter.pointNorth.latitude })
            .andWhere(`${sportCenter}.latitude >= :pointS`, { pointS: dataFilter.pointSouth.latitude })
            .andWhere(`${sportCenter}.longitude <= :pointE`, { pointE: dataFilter.pointEast.longitude })
            .andWhere(`${sportCenter}.longitude >= :pointW`, { pointW: dataFilter.pointWest.longitude })
            .having(`${sportCenter}_distance < ${opts.distance}`)
            .orderBy(`${sportCenter}_distance`)
    }

    async getSportCenterByGeolocation(
        query: TypeQueryGetSportCenters,
        dataFilter: TypePointFourDirection
    ) {
        const queryBuilder = this.queryBuilderSportCenterByLocation(query, dataFilter);
        const sportCenter = this.models.sport_center;
        const sport = this.models.sport;
        if (query.sportId || query.sport) {
            queryBuilder.leftJoinAndSelect(`${sportCenter}.sports`, sport);
            queryBuilder.andWhere(`${sport}.${query.sportId ? 'id' : 'name'} = :sport`, { sport: query.sportId || query.sport });
        }
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
        optionFilter?: OptionsFilterTimeSlotBlank
    ) {
        const sportCenter = this.models.sport_center;
        const sportGround = this.models.sport_ground;
        const sportGroundTimeSlot = this.models.sport_ground_time_slot;
        const booking = this.models.booking;
        const query = this.createQueryBuilder(sportCenter)
            .leftJoinAndSelect(sportGround, sportGround, `${sportGround}.sportCenterId = ${sportCenter}.id`)
            .leftJoinAndSelect(sportGroundTimeSlot, sportGroundTimeSlot, `${sportGroundTimeSlot}.sportGroundId = ${sportGround}.id`)
            .leftJoinAndSelect(qb => {
                return qb
                    .addSelect('COUNT(*)', 'count')
                    .addSelect(`${booking}.id`)
                    .addSelect(`${booking}.timeSlotId`)
                    .addSelect(`${booking}.bookingDate`)
                    .addFrom<Booking>('Booking', booking)
                    .where(`${booking}.bookingDate LIKE :bookingDate`, { bookingDate: bookingDate + '%' })
                    .groupBy(`${booking}_timeSlotId`)
                    .addGroupBy(`${booking}_bookingDate`)
            }, booking, `${booking}_timeSlotId = ${sportGroundTimeSlot}.id`)
            .where(`${sportGround}.sportId = :sportId`, { sportId })
            .andWhere(`${sportGroundTimeSlot}.startTime >= :startTime`, { startTime })
            .andWhere(new Brackets(qb => {
                return qb.where(`count < ${sportGround}.quantity`)
                    .orWhere(`count is null`)
            }))
            .limit(optionFilter.limit || null)
            .offset(optionFilter.page && optionFilter.limit ? (optionFilter.page - 1) * optionFilter.limit : null)

        if (optionFilter.pointFourDirection) {
            return query.addSelect(`
                (${HAVERSINE.R_Earth} * acos (
                    cos ( radians(${optionFilter.latitude}) )
                    * cos( radians(latitude ) )
                    * cos( radians(longitude ) - radians(${optionFilter.longitude}) )
                    + sin( radians(${optionFilter.latitude}) )
                    * sin( radians(latitude ) )
                ))`
                , `${sportCenter}_distance`)
                .andWhere(`${sportCenter}.latitude <= :pointN`, { pointN: optionFilter.pointFourDirection.pointNorth.latitude })
                .andWhere(`${sportCenter}.latitude >= :pointS`, { pointS: optionFilter.pointFourDirection.pointSouth.latitude })
                .andWhere(`${sportCenter}.longitude <= :pointE`, { pointE: optionFilter.pointFourDirection.pointEast.longitude })
                .andWhere(`${sportCenter}.longitude >= :pointW`, { pointW: optionFilter.pointFourDirection.pointWest.longitude })
                .having(`${sportCenter}_distance < ${optionFilter.distance}`)
                .orderBy(`${sportCenter}_distance`)
                .getRawMany();
        }
        return query.getRawMany();
    }

    async getSportCenters(query: TypeQueryGetSportCenters = {} as TypeQueryGetSportCenters) {
        const sportCenter = this.models.sport_center;
        const sport = this.models.sport;
        const queryBuilder = this.createQueryBuilder(sportCenter);
        if (query.sportId || query.sport) {
            queryBuilder.leftJoinAndSelect(`${sportCenter}.sports`, sport);
            queryBuilder.where(`${sport}.${query.sportId ? 'id' : 'name'} = :sport`, { sport: query.sportId || query.sport });
            query.userId && queryBuilder.andWhere(`${sportCenter}.userId = :userId`, { userId: +query.userId });
        } else {
            query.userId && queryBuilder.where(`${sportCenter}.userId = :userId`, { userId: +query.userId });
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
        const booking = this.models.booking;
        const qb = this.createQueryBuilder(sportCenter)
            .leftJoinAndMapMany(`${sportCenter}.sportGrounds`, sportGround, sportGround, `${sportCenter}.id = ${sportGround}.sportCenterId`)
            .leftJoinAndMapMany(`${sportGround}.sportGroundTimeSlots`, sportGroundTimeSlot, sportGroundTimeSlot, `${sportGround}.id = ${sportGroundTimeSlot}.sportGroundId`)
            .leftJoinAndSelect(`${sportCenter}.sports`, sport)
            .where(`${sportCenter}.id = :id`, { id: +opts.id });

        if (opts.startDate && opts.endDate) {
            qb.leftJoinAndMapMany(`${sportGroundTimeSlot}.bookings`, qb => {
                return qb
                    .addSelect('COUNT(*)', 'count')
                    .addSelect(`${booking}.id`)
                    .addSelect(`${booking}.timeSlotId`)
                    .addSelect(`${booking}.bookingDate`)
                    .addFrom<Booking>('Booking', booking)
                    .where(`${booking}.bookingDate BETWEEN :startDate AND :endDate`, { startDate: opts.startDate, endDate: opts.endDate })
                    .groupBy(`${booking}_timeSlotId`)
                    .addGroupBy(`${booking}_bookingDate`)
            }, booking, `${booking}_timeSlotId = ${sportGroundTimeSlot}.id`)
        }
        return qb.getRawAndEntities();
    }
}

// SELECT 
//     `alias`.`id` AS `alias_id`,
//     `alias`.`userId` AS `alias_userId`,
//     `alias`.`name` AS `alias_name`,
//     `alias`.`code` AS `alias_code`,
//     `alias`.`country` AS `alias_country`,
//     `alias`.`city` AS `alias_city`,
//     `alias`.`district` AS `alias_district`,
//     `alias`.`commune` AS `alias_commune`,
//     `alias`.`address` AS `alias_address`,
//     `alias`.`avatar` AS `alias_avatar`,
//     `alias`.`latitude` AS `alias_latitude`,
//     `alias`.`longitude` AS `alias_longitude`,
//     `alias`.`createdAt` AS `alias_createdAt`,
//     `alias`.`updatedAt` AS `alias_updatedAt`,
//     `sport_ground`.`id` AS `sport_ground_id`,
//     `sport_ground`.`sportCenterId` AS `sport_ground_sportCenterId`,
//     `sport_ground`.`sportId` AS `sport_ground_sportId`,
//     `sport_ground`.`name` AS `sport_ground_name`,
//     `sport_ground`.`code` AS `sport_ground_code`,
//     `sport_ground`.`type` AS `sport_ground_type`,
//     `sport_ground`.`avatar` AS `sport_ground_avatar`,
//     `sport_ground`.`quantity` AS `sport_ground_quantity`,
//     `sport_ground`.`quantityInStock` AS `sport_ground_quantityInStock`,
//     `sport_ground`.`description` AS `sport_ground_description`,
//     `sport_ground`.`createdAt` AS `sport_ground_createdAt`,
//     `sport_ground`.`updatedAt` AS `sport_ground_updatedAt`,
//     `sport_ground_time_slot`.*,
//     `booking`.*
// FROM
//     `sport_center` `alias`
//         inner JOIN
//     `sport_ground` `sport_ground` ON `sport_ground`.`sportCenterId` = `alias`.`id`
// 		inner JOIN
//     `sport_ground_time_slot` `sport_ground_time_slot` ON `sport_ground`.`id` = `sport_ground_time_slot`.`sportGroundId`
//         inner JOIN
//     (SELECT 
//         `booking`.`id` AS `booking_id`,
//             `booking`.`sportGroundId` AS `booking_sportGroundId`,
//             `booking`.`timeSlotId` AS `booking_timeSlotId`,
//             `booking`.`bookingDate` AS `booking_bookingDate`,
//             COUNT(*) AS `count`
//     FROM
//         `booking` `booking`
// 	where `booking`.`bookingDate` LIKE "2020-01-19%"
//     GROUP BY `booking_timeSlotId`, `booking_bookingDate`
//     ) `booking` ON `booking_timeSlotId` = `sport_ground_time_slot`.`id`
//     where `sport_ground`.`sportId` = 1 and (`count` < `sport_ground`.`quantity` or `count` is null);