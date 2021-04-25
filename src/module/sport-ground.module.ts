import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportGroundController } from './../controller/sport-ground.controller';
import { SportGroundService } from './../service/sport-ground.service';
import { SportGroundRepository } from './../repository/sport-ground.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SportGroundRepository])],
  providers: [SportGroundService],
  controllers: [SportGroundController],
  exports: [SportGroundService],
})
export class SportGroundModule {}
