import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportRepository } from './../repository/sport.repository';
import { SportController } from '../controller/sport.controller';
import { SportService } from '../service/sport.service';

@Module({
  imports: [TypeOrmModule.forFeature([SportRepository])],
  providers: [SportService],
  controllers: [SportController],
  exports: [SportService],
})
export class SportModule {}
