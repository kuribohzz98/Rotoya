import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from './../module/email.module';
import { ConfigService } from './../config/config.service';
import { UserModule } from './../module/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strargety';
import { AuthService } from './auth.service';

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
    UserModule,
    EmailModule
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
