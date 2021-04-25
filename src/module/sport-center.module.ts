import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RpcModule } from './prc.module';
import { SportCenterService } from './../service/sport-center.service';
import { SportHanderService } from './../service/sportHander.service';
import { SportCenterRepository } from './../repository/sportCenter.repository';
import { SportCenterController } from './../controller/sport-center.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SportCenterRepository]), RpcModule],
  providers: [SportCenterService, SportHanderService],
  controllers: [SportCenterController],
  exports: [SportCenterService],
})
export class SportCenterModule {}
