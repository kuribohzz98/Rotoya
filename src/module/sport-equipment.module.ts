import { SportEquipmentController } from './../controller/sport-equipment.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportEquipmentRepository } from 'src/repository/sport-equipment.repository';
import { SportEquipmentService } from 'src/service/sport-equipment.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SportEquipmentRepository])
    ],
    providers: [SportEquipmentService],
    controllers: [SportEquipmentController],
    exports: [SportEquipmentService]
})
export class SportEquipmentModule { }
