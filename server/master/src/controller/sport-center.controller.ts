import { BaseController } from './../base/BaseController';
import { Controller, Get, Query, Param, Put } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { of, from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TypeGetSportCenters } from './type/sport-center.type';
import { SportHanderService } from './../service/sportHander.service';
import { SportCenterService } from './../service/sport-center.service';
import { SportCenterInfoDto, SportCenterDataFindByRadius } from './../dto/sportCenter.dto';

@ApiTags('SportCenter')
@Controller('sport-center')
export class SportCenterController {

    constructor(
        private readonly sportCenterService: SportCenterService,
        private readonly sportHanderService: SportHanderService
    ) {
        // super();
    }

    @ApiQuery({ name: 'time', description: new Date().getTime().toString(), required: false })
    @Get(':id')
    async getSportCenter(
        @Param('id') id: number,
        @Query() query: { time: number }
    ): Promise<SportCenterInfoDto> {
        const result = await this.sportCenterService.getSportCenter({ id, time: +query.time });
        return result;
    }

    @Get()
    getSportCenters$(
        @Query() query: TypeGetSportCenters
    ): Observable<(SportCenterInfoDto | SportCenterDataFindByRadius)[]> {
        console.log(query);
        return of(query)
            .pipe(
                mergeMap(query => {
                    if (query.isTimeSlotBlank + '' === 'true') {
                        return this.sportHanderService.getSportCenterTimeBlank$(query);
                    } else {
                        if (query.isByLocation + '' === 'true') return this.sportHanderService.getSportCenterByGeoLocation$(query);
                    }
                    return from(this.sportCenterService.getSportCenters(query))
                })
            )
    }

    @Put()
    updateSportCenter() {

    }
}