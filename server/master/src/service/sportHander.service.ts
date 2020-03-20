import { TypeQueryGetSportCenters } from './../interface/sport.interface';
import { SportService } from './sport.service';
import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { RpcService } from './rpc.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class SportHanderService {
    constructor(
        public readonly sportService: SportService,
        public readonly rpcService: RpcService
    ) { }

    getSportCenterTimeBlank$(query: TypeQueryGetSportCenters) {
        return this.rpcService.getLimitPoints(query)
            .pipe(
                mergeMap(data => from(this.sportService.getSportCenterBySlotTimeBlank(
                    query.sportId,
                    +query.time,
                    {
                        ...query,
                        pointFourDirection: data
                    }
                )))
            )
    }

    getSportCenterByGeoLocation$(query: TypeQueryGetSportCenters) {
        return this.rpcService.getLimitPoints(query)
            .pipe(
                mergeMap(data => from(this.sportService.getSportCentersByGeolocation(query, data)))
            )
    }
}
