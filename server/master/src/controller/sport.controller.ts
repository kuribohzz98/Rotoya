import { RpcService } from './../service/rpc.service';
import {
  TypePositionMapAndDistance,
  TypePositionMapDistanceAndSport,
  TypeQuerySportCenterTimeSlotBlank
} from './../interface/map.interface';
import { SportService } from './../service/sport.service';
import { Controller, Get, Query, Response } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('sport')
@Controller('sport')
export class SportController {
  constructor(
    private readonly sportService: SportService,
    private readonly rpcService: RpcService
  ) { }

  @Get('getAllSport')
  async getAllSport() {
    const sports = await this.sportService.getSports();
    return sports;
  }

  @Get('getSportCenter')
  async getSportCenter() {
    const sportCenters = await this.sportService.getAllSportCenter();
    return sportCenters;
  }

  @Get('getSportCenterSport')
  @ApiQuery({ name: 'sport' })
  async getSportCentreBySport(@Query() query: { sport: string }) {
    const sportCenters = await this.sportService.getSportCenterBySport(query.sport);
    return sportCenters;
  }

  // @Get('test')
  // async getTest() {
  //   const queryTest = await this.sportService.getSportCenterBySlotTimeBlank();
  //   return queryTest;
  // }

  @Get('getSportCenterByGeolocation')
  @ApiQuery({ name: 'longitude' })
  @ApiQuery({ name: 'latitude' })
  @ApiQuery({ name: 'distance' })
  async getSportCenterByGeolocation(@Query() query: TypePositionMapAndDistance, @Response() res) {
    const sub = this.rpcService.getLimitPoints(query).subscribe(async data => {
      const result = await this.sportService.getSportCenterInRadius(
        query.latitude,
        query.longitude,
        query.distance,
        data
      );
      res.json(result);
      sub.unsubscribe();
    })
  }

  @Get('getSportCenterByGeolocationAndSport')
  @ApiQuery({ name: 'longitude' })
  @ApiQuery({ name: 'latitude' })
  @ApiQuery({ name: 'distance' })
  @ApiQuery({ name: 'sport' })
  async getSportCenterByGeolocationAndSport(@Query() query: TypePositionMapDistanceAndSport, @Response() res) {
    const sub = this.rpcService.getLimitPoints(query).subscribe(async data => {
      const result = await this.sportService.getSportCenterInRadiusBySport(
        query.latitude,
        query.longitude,
        query.distance,
        query.sport,
        data
      );
      res.json(result);
      sub.unsubscribe();
    })
  }

  @Get('getSportCenterByGeolocationAndSport/timeSlotBlank')
  @ApiQuery({ name: 'longitude' })
  @ApiQuery({ name: 'latitude' })
  @ApiQuery({ name: 'distance' })
  @ApiQuery({ name: 'sportId' })
  @ApiQuery({ name: 'time' , description: new Date().getTime().toString()})
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getSportCentreByGeolocationAndSport(@Query() query: TypeQuerySportCenterTimeSlotBlank, @Response() res) {
    const sub = this.rpcService.getLimitPoints(query).subscribe(async data => {
      const sportCenters = await this.sportService.getSportCenterBySlotTimeBlank(
        query.sportId,
        +query.time,
        {
          lat: query.latitude,
          lon: query.longitude,
          distance: query.distance,
          limit: query.limit,
          page: query.page,
          pointFourDirection: data
        }
      );
      res.json(sportCenters);
      sub.unsubscribe();
    })
  }
}
