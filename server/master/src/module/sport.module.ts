import { SportHanderService } from './../service/sportHander.service';
import { SportRepository } from './../repository/sport.repository';
import { SportController } from '../controller/sport.controller';
import { SportService } from '../service/sport.service';
import { SportCenterRepository } from '../repository/sportCenter.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RpcModule } from './prc.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        RpcModule,
        TypeOrmModule.forFeature([
            SportCenterRepository,
            SportRepository
        ])
    ],
    providers: [SportService, SportHanderService],
    controllers: [SportController],
    exports: [SportService]
})
export class SportModule { }
