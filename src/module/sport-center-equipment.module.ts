import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportCenterEquipmentService } from './../service/sport-center-equipment.service';
import { SportCenterEquipmentRepository } from './../repository/sport-center-equipment.repository';
import { SportCenterEquipmentController } from './../controller/sport-center-equipment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SportCenterEquipmentRepository])],
  providers: [SportCenterEquipmentService],
  controllers: [SportCenterEquipmentController],
  exports: [SportCenterEquipmentService],
})
export class SportCenterEquipmentModule {}
