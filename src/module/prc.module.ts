import { ProviderRepository } from './../constants/provider.constants';
import { RpcService } from './../service/rpc.service';
import { ConfigService } from './../config/config.service';
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
    providers: [
        {
            provide: ProviderRepository.PRC_REDIS_PROVIDER,
            useFactory: (configService: ConfigService) => {
                return ClientProxyFactory.create({
                    transport: Transport.REDIS,
                    options: {
                        url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`
                    }
                })
            },
            inject: [ConfigService]
        },
        RpcService
    ],
    exports: [RpcService]
})
export class RpcModule { }
