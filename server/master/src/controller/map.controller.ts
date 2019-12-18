import { RpcService } from './../service/rpc.service';
import { TypePositionMapAndDistance } from './../interface/map.interface';
import { Controller, Get, Query, Response } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Map')
@Controller('map')
export class MapController {
  constructor(
    private readonly rpcService: RpcService
  ) { }

  @Get('getPointFourDirection')
  @ApiQuery({name: 'longitude'})
  @ApiQuery({name: 'latitude'})
  @ApiQuery({name: 'distance'})
  async getPointFourDirection(@Query() query: TypePositionMapAndDistance, @Response() res) {
    console.log(query);
    this.rpcService.getLimitPoints(query).subscribe(data => {
      res.json({ data });
    })
  }
}
