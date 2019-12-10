import { ConfigService } from './../config/config.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get('MONGO_DATABASE')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    })
  ],
})
export class DatabaseModule {}
