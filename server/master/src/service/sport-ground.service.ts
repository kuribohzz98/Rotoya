import { Injectable } from "@nestjs/common";
import { SportGroundDto, SportGroundInfoDto } from './../dto/sport-ground.dto';
import { SportGround } from './../entity/SportGround.entity';
import { SportGroundRepository } from './../repository/sport-ground.repository';
import { SportGroundAttribute } from './../interface/attribute.interface';
import { BaseService } from './../base/BaseService';
import { TypeQueryGetSportCenter } from './../interface/sport.interface';
import { GetFullDate } from "./../helper/utils/date";

@Injectable()
export class SportGroundService
    extends BaseService<SportGroundRepository, SportGround, SportGroundAttribute, SportGroundDto> {

    constructor(
        private readonly sportGroundRepository: SportGroundRepository
    ) {
        super(sportGroundRepository)
    }
    mapEntityToDto(entity: SportGround): SportGroundDto {
        return new SportGroundDto(entity);
    }

    async getSportGround(opts: TypeQueryGetSportCenter) {
        opts.startDate = GetFullDate(opts.time);
        opts.endDate = GetFullDate(opts.time);
        const sportGround = await this.sportGroundRepository.getSportGround(opts);
        const result = new SportGroundInfoDto(sportGround.entities[0]);
        sportGround.raw.map(raw => {
            const timeSlot = result.sportGroundTimeSlots
                .find(sgTimeSlot => sgTimeSlot.id == raw[`${this.sportGroundRepository.models.sport_ground_time_slot}_id`]);
            if (timeSlot) {
                if (raw[`count`]) {
                    const saved = timeSlot.bookeds.find(booked => new Date(booked.date).getTime() == new Date(raw[`${this.sportGroundRepository.models.booking}_bookingDate`]).getTime());
                    !saved && timeSlot.bookeds.push({
                        date: raw[`${this.sportGroundRepository.models.booking}_bookingDate`],
                        amount: +raw[`count`]
                    })
                }
                if (raw[`${this.sportGroundRepository.models.sport_center_equipment_booking}_id`]) {
                    const sceBooking = this.sportGroundRepository.models.sport_center_equipment_booking;
                    const saved = timeSlot.sportCenterEquipmentBookings.find(_ => _.id == raw[`${sceBooking}_id`]);
                    !saved && timeSlot.sportCenterEquipmentBookings.push({
                        id: raw[`${sceBooking}_id`],
                        sportCenterEquipmentId: raw[`${sceBooking}_sportCenterEquipmentId`],
                        bookingId: raw[`${sceBooking}_bookingId`],
                        price: raw[`${sceBooking}_price`],
                        amount: raw[`${sceBooking}_amount`]
                    })
                }
            }
        });
        result.sportGroundTimeSlots.sort((a, b) => a.startTime - b.startTime);
        return result;
    }
}