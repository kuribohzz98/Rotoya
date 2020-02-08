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

    async getSportCenterInRadius(
        R_earth: number,
        r_find: number,
        lat: number,
        lng: number,
        dataFilter: TypePointFourDirection
    ) {
        const sportCenter = this.models.sport_center;
        return this.createQueryBuilder(sportCenter)
            .addSelect(`
                (${R_earth} * acos (
                    cos ( radians(${lat}) )
                    * cos( radians(latitude ) )
                    * cos( radians(longitude ) - radians(${lng}) )
                    + sin( radians(${lat}) )
                    * sin( radians(latitude ) )
                ))`
                , `${sportCenter}_distance`)
            .leftJoinAndSelect(`${sportCenter}.sports`, "sport")
            .where(`${sportCenter}.latitude <= :pointN`, { pointN: dataFilter.pointNorth.latitude })
            .andWhere(`${sportCenter}.latitude >= :pointS`, { pointS: dataFilter.pointSouth.latitude })
            .andWhere(`${sportCenter}.longitude <= :pointE`, { pointE: dataFilter.pointEast.longitude })
            .andWhere(`${sportCenter}.longitude >= :pointW`, { pointW: dataFilter.pointWest.longitude })
            .having(`${sportCenter}_distance < ${r_find}`)
            .orderBy(`${sportCenter}_distance`)
            .getRawMany();
    }

    async getSportCenterInRadiusBySport(
        R_earth: number,
        r_find: number,
        lat: number,
        lng: number,
        sport: string,
        dataFilter: TypePointFourDirection
    ) {
        const sportCenter = this.models.sport_center;
        return this.createQueryBuilder(sportCenter)
            .addSelect(`
                (${R_earth} * acos (
                    cos ( radians(${lat}) )
                    * cos( radians(latitude ) )
                    * cos( radians(longitude ) - radians(${lng}) )
                    + sin( radians(${lat}) )
                    * sin( radians(latitude ) )
                ))`
                , `${sportCenter}_distance`)
            .leftJoinAndSelect(`${sportCenter}.sports`, "sport")
            .where(`${sportCenter}.latitude <= :pointN`, { pointN: dataFilter.pointNorth.latitude })
            .andWhere(`${sportCenter}.latitude >= :pointS`, { pointS: dataFilter.pointSouth.latitude })
            .andWhere(`${sportCenter}.longitude <= :pointE`, { pointE: dataFilter.pointEast.longitude })
            .andWhere(`${sportCenter}.longitude >= :pointW`, { pointW: dataFilter.pointWest.longitude })
            .andWhere(`sport.name = :sport`, { sport })
            .having(`${sportCenter}_distance < ${r_find}`)
            .orderBy(`${sportCenter}_distance`)
            .getRawMany();
    }

    async getSportCentersBySport(sport: string) {
        return this.createQueryBuilder('alias')
            .leftJoinAndSelect(`alias.sports`, 'sport')
            .where(`sport.name = :sport`, { sport })
            .getMany();
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
                    .addSelect(`${booking}.sportGroundId`)
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
            return  query.addSelect(`
                (${HAVERSINE.R_Earth} * acos (
                    cos ( radians(${optionFilter.lat}) )
                    * cos( radians(latitude ) )
                    * cos( radians(longitude ) - radians(${optionFilter.lon}) )
                    + sin( radians(${optionFilter.lat}) )
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