import { TypePointFourDirection, TypePositionMapAndDistance } from './../interface/type.interface';
import { MapWorker } from './../worker/Map/MapWorker';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MapController {
  constructor(
  ) {}

  @MessagePattern('GetLimitPoints')
  accumulate(data: TypePositionMapAndDistance) {
    const worker = new MapWorker(data);
    return worker.finalData().then((data: TypePointFourDirection) => {
        return data;
    })
  }
}
