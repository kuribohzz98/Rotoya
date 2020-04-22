import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SportCenterService } from './sport-center.service';
import { TypeQueryGetSportCenters } from './../interface/sport.interface';
import { RpcService } from './rpc.service';
import { SportCenterDataFindByRadius, SportCenterInfoDto } from './../dto/sportCenter.dto';

@Injectable()
export class SportHanderService {
    constructor(
        public readonly sportCenterService: SportCenterService,
        public readonly rpcService: RpcService
    ) { }

    getSportCenterTimeBlank$(
        query: TypeQueryGetSportCenters
    ): Observable<(SportCenterDataFindByRadius | SportCenterInfoDto)[]> {
        return this.rpcService.getLimitPoints(query)
            .pipe(
                mergeMap(data => from(this.sportCenterService.getSportCenterBySlotTimeBlank(
                    query.sportId,
                    +query.time,
                    {
                        ...query,
                        pointFourDirection: data
                    }
                )))
            )
    }

    getSportCenterByGeoLocation$(
        query: TypeQueryGetSportCenters
    ): Observable<(SportCenterDataFindByRadius | SportCenterInfoDto)[]> {
        return this.rpcService.getLimitPoints(query)
            .pipe(
                mergeMap(data => from(this.sportCenterService.getSportCentersByGeolocation(query, data)))
            )
    }
}
