import { MapController } from './../controller/map.controller';
import { RpcModule } from './prc.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        RpcModule
    ],
    providers: [],
    controllers: [MapController],
    exports: []
})
export class MapModule { }
