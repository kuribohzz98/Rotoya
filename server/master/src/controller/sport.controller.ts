import { RpcService } from './../service/rpc.service';
import {
  TypePositionMapAndDistance,
  TypePositionMapDistanceAndSport,
  TypeQuerySportCenterTimeSlotBlank
} from './../interface/map.interface';
import { SportService } from './../service/sport.service';
import { Controller, Get, Query, Response } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { OptionsPaging } from 'src/interface/repository.interface';
import { take } from 'rxjs/operators';

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

  @Get('getSportCenters')
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getSportCenter(@Query() query: OptionsPaging) {
    const sportCenters = await this.sportService.getAllSportCenter(query);
    return sportCenters;
  }

  @Get('getSportCentersSport')
  @ApiQuery({ name: 'sport' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getSportCentreBySport(@Query() query: { sport: string, limit?: number, page?: number }) {
    const sportCenters = await this.sportService.getSportCenterBySport(
      query.sport,
      { limit: query.limit, page: query.page }
    );
    return sportCenters;
  }

  // @Get('test')
  // async getTest() {
  //   const queryTest = await this.sportService.getSportCenterBySlotTimeBlank();
  //   return queryTest;
  // }

  @Get('getSportCentersByGeolocation')
  @ApiQuery({ name: 'longitude' })
  @ApiQuery({ name: 'latitude' })
  @ApiQuery({ name: 'distance' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getSportCenterByGeolocation(@Query() query: TypePositionMapAndDistance, @Response() res) {
    this.rpcService.getLimitPoints(query)
      .pipe(take(1))
      .subscribe(async data => {
        const result = await this.sportService.getSportCenterInRadius(query, data);
        res.json(result);
      })
  }

  @Get('getSportCentersByGeolocationAndSport')
  @ApiQuery({ name: 'longitude' })
  @ApiQuery({ name: 'latitude' })
  @ApiQuery({ name: 'distance' })
  @ApiQuery({ name: 'sport' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getSportCenterByGeolocationAndSport(@Query() query: TypePositionMapDistanceAndSport, @Response() res) {
    this.rpcService.getLimitPoints(query)
      .pipe(take(1))
      .subscribe(async data => {
        const result = await this.sportService.getSportCenterInRadiusBySport(query, data);
        res.json(result);
      })
  }

  @Get('getSportCenterByGeolocationAndSport/timeSlotBlank')
  @ApiQuery({ name: 'longitude' })
  @ApiQuery({ name: 'latitude' })
  @ApiQuery({ name: 'distance' })
  @ApiQuery({ name: 'sportId' })
  @ApiQuery({ name: 'time', description: new Date().getTime().toString() })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getSportCentreByGeolocationAndSport(@Query() query: TypeQuerySportCenterTimeSlotBlank, @Response() res) {
    this.rpcService.getLimitPoints(query)
      .pipe(take(1))
      .subscribe(async data => {
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
      })
  }
}
