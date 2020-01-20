import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportModule } from './module/sport.module';
import { MapModule } from './module/map.module';
import { RpcModule } from './module/prc.module';
import { ConfigService } from './config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './module/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule,
    AuthModule,
    UserModule,
    RpcModule,
    MapModule,
    SportModule
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
