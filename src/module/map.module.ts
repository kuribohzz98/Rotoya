import { MapService } from './../service/map.service';
import { SportCenterRepository } from '../repository/sportCenter.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapController } from './../controller/map.controller';
import { RpcModule } from './prc.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [RpcModule, TypeOrmModule.forFeature([SportCenterRepository])],
  providers: [MapService],
  controllers: [MapController],
  exports: [MapService],
})
export class MapModule {}
