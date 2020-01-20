import { ConfigService } from './../config/config.service';
import { UserModule } from './../module/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strargety';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_JWT')
      }),
      inject: [ConfigService],
      // signOptions: { expiresIn: '60s' },
    }),
    UserModule
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
