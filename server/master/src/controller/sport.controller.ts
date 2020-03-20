import { SportHanderService } from './../service/sportHander.service';
import {
  TypeQueryGetSportCenters
} from './../interface/sport.interface';
import { SportService } from './../service/sport.service';
import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { mergeMap } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';

@ApiTags('sport')
@Controller('sport')
export class SportController {
  constructor(
    private readonly sportService: SportService,
    private readonly sportHanderService: SportHanderService
  ) { }

  @Get('getAllSport')
  async getAllSport() {
    const sports = await this.sportService.getSports();
    return sports;
  }

  @Get('sportCenter/:id')
  @ApiQuery({ name: 'time', description: new Date().getTime().toString(), required: false })
  async getSportCenter(@Param('id') id: number, @Query() query: { time: number }) {
    const result = await this.sportService.getSportCenter({ id, time: +query.time });
    return result;
  }

  @ApiQuery({ name: 'longitude', description: '105.781477', required: false })
  @ApiQuery({ name: 'latitude', description: '21.037671', required: false })
  @ApiQuery({ name: 'distance', required: false })
  @ApiQuery({ name: 'sportId', required: false })
  @ApiQuery({ name: 'sport', required: false })
  @ApiQuery({ name: 'time', description: new Date().getTime().toString(), required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'isTimeSlotBlank', type: 'boolean', required: false })
  @ApiQuery({ name: 'isByLocation', type: 'boolean', required: false })
  @Get('sportCenters')
  getSportCenters$(@Query() query: TypeQueryGetSportCenters) {
    console.log(query);
    return of(query)
      .pipe(
        mergeMap(query => {
          if (query.isTimeSlotBlank + '' === 'true') {
            return this.sportHanderService.getSportCenterTimeBlank$(query);
          } else {
            if (query.isByLocation + '' === 'true') {
              return this.sportHanderService.getSportCenterByGeoLocation$(query);
            }
          }
          // if (!query.isByLocation && !query.isTimeSlotBlank) {
          return from(this.sportService.getSportCenters(query))
          // }
        })
      )
  }
}
