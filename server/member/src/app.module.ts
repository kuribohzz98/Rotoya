import { MapModule } from './module/map.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestWorker } from './worker/TestWorker';

@Module({
  imports: [
    ConfigModule,
    // DatabaseModule,
    MapModule
    // MongooseModule.forRootAsync('mongodb://0.0.0.0:27017/rotoya', {useNewUrlParser: true})
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'URL_REDIS',
      useFactory: (configService: ConfigService) => {
        return `${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`
      },
      inject: [ConfigService]
    },
    // TestWorker
  ],
})
export class AppModule {}
