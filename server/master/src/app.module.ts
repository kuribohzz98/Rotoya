import { RpcModule } from './module/prc.module';
import { ConfigService } from './config/config.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './module/user.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    RpcModule
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
  ],
})
export class AppModule {}
