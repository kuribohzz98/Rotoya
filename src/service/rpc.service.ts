import { TypePositionMapAndDistance, TypePointFourDirection } from './../interface/map.interface';
import { ProviderRepository } from './../constants/provider.constants';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class RpcService {
    constructor(
        @Inject(ProviderRepository.PRC_REDIS_PROVIDER) private readonly client: ClientProxy
    ) { }

    sendTest(): Observable<any> {
        return this.client.send('test', '___ahihi___');
    }

    getLimitPoints(data: TypePositionMapAndDistance): Observable<TypePointFourDirection> {
        return this.client.send('GetLimitPoints', data);
    }
}
