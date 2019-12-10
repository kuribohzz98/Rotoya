import { ProviderRepository } from './../constants/provider.constants';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RpcService {
    constructor(
        @Inject(ProviderRepository.PRC_REDIS_PROVIDER) private readonly client: ClientProxy
    ) { }

    sendTest() {
        return this.client.send('test', '___ahihi___');
    }
}
