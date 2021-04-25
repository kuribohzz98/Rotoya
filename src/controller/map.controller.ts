import { MapService } from './../service/map.service';
import { RpcService } from './../service/rpc.service';
import { Controller, Get, Query, Response } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Map')
@Controller('map')
export class MapController {
  constructor(
    private readonly rpcService: RpcService,
    private readonly mapService: MapService,
  ) {}

  // @Get('getPointFourDirection')
  // @ApiQuery({ name: 'longitude' })
  // @ApiQuery({ name: 'latitude' })
  // @ApiQuery({ name: 'distance' })
  // async getPointFourDirection(@Query() query: TypePositionMapAndDistance, @Response() res) {
  //   console.log(query);
  //   this.rpcService.getLimitPoints(query).subscribe(async data => {
  //     const result = await this.mapService.getSportCenterInRadius(query.latitude, query.longitude, query.distance, data);
  //     res.json(result);
  //   })
  // }
}
