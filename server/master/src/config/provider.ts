import { Provider } from "@nestjs/common";
import { ConfigService } from './config.service';
import { Providers } from './../constants/provider.constants';

export const ProvidersConfig: Provider<any>[] = [
    {
        provide: Providers.Port,
        useFactory: (configService: ConfigService) => {
            return configService.get('PORT_LISTEN');
        },
        inject: [ConfigService]
    },
    {
        provide: Providers.GlobalPrefix,
        useFactory: (configService: ConfigService) => {
            return configService.get('GLOBAL_PREFIX');
        },
        inject: [ConfigService]
    },
    {
        provide: Providers.PathSwagger,
        useFactory: (configService: ConfigService) => {
            return configService.get('PATH_SWAGGER');
        },
        inject: [ConfigService]
    }
]