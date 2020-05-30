import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueModule } from './queue/queue.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { ProvidersConfig } from './config/provider';
import Modules from './module';

@Module({
  imports: [
    TypeOrmModule.forRoot({keepConnectionAlive: true,}),
    ...Modules,
    ConfigModule,
    AuthModule,
    QueueModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...ProvidersConfig
  ]
})
export class AppModule { }
