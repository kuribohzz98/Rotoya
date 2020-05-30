import { Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TypePointFourDirection } from './../interface/map.interface';
import { MapWorker } from './../worker/Map/MapWorker';
import { SportCenterService } from './sport-center.service';
import { TypeQueryGetSportCenters } from './../interface/sport.interface';
import { RpcService } from './rpc.service';
import { SportCenterDataFindByRadius, SportCenterInfoDto } from './../dto/sportCenter.dto';
import {
    destinationPointGivenDistanceAndBearingFromStartPoint,
    toRadian
} from './../helper/utils/fomular';

@Injectable()
export class SportHanderService {
    constructor(
        public readonly sportCenterService: SportCenterService,
        public readonly rpcService: RpcService
    ) { }

    getSportCenterTimeBlank$(
        query: TypeQueryGetSportCenters
    ): Observable<(SportCenterDataFindByRadius | SportCenterInfoDto)[]> {
        // const worker = new MapWorker(query);
        // return from(worker.finalData())
        // return this.rpcService.getLimitPoints(query)
        return of(this.caculateFourPoint(query))
        .pipe(
                mergeMap((data: TypePointFourDirection) => from(this.sportCenterService.getSportCenterBySlotTimeBlank(
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
        // const worker = new MapWorker(query);
        // return from(worker.finalData())
        // return this.rpcService.getLimitPoints(query)
        return of(this.caculateFourPoint(query))
        .pipe(
                mergeMap((data: TypePointFourDirection) => from(this.sportCenterService.getSportCentersByGeolocation(query, data)))
            )
    }

    caculateFourPoint(query: TypeQueryGetSportCenters) {
        const data = {} as TypePointFourDirection;
        data.pointNorth = destinationPointGivenDistanceAndBearingFromStartPoint(query, 0);
        data.pointEast = destinationPointGivenDistanceAndBearingFromStartPoint(query, toRadian(90));
        data.pointSouth = destinationPointGivenDistanceAndBearingFromStartPoint(query, toRadian(180));
        data.pointWest = destinationPointGivenDistanceAndBearingFromStartPoint(query, toRadian(270));
        return data;
    }
}
