import { Injectable } from "@nestjs/common";
import { BaseService } from './../base/BaseService';
import { SportGroundTimeSlotDto } from './../dto/sport-ground-time-slot.dto';
import { SportGroundTimeSlot } from './../entity/SportGroundTimeSlot.entity';
import { TimeSlotRepository } from './../repository/timeslot.repository';
import { SportGroundTimeSlotAttribute } from './../interface/attribute.interface';

@Injectable()
export class SportGroundTimeSlotService
    extends BaseService<TimeSlotRepository, SportGroundTimeSlot, SportGroundTimeSlotAttribute, SportGroundTimeSlotDto> {

    constructor(
        private readonly timeSlotRepository: TimeSlotRepository
    ) {
        super(timeSlotRepository)
    }

    mapEntityToDto(entity: SportGroundTimeSlot): SportGroundTimeSlotDto {
        return new SportGroundTimeSlotDto(entity);
    }

} 