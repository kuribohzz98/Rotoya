import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportGroundTimeSlotService } from './../service/sport-gound-time-slot.service';
import { TimeSlotRepository } from './../repository/timeslot.repository';
import { SportGroundTimeSlotController } from '../controller/sport-ground-time-slot.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([TimeSlotRepository])
    ],
    providers: [SportGroundTimeSlotService],
    controllers: [SportGroundTimeSlotController],
    exports: [SportGroundTimeSlotService]
})
export class SportGroundTimeSlotModule { }
