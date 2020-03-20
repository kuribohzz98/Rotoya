import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueModule } from './queue/queue.module';
import { ConfigService } from './config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import Modules from './module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ...Modules,
    ConfigModule,
    AuthModule,
    QueueModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'PORT',
      useFactory: (configService: ConfigService) => {
        return +configService.get('PORT_LISTEN');
      },
      inject: [ConfigService]
    },
  ]
})
export class AppModule { }
