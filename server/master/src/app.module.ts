import { RoleRepository } from './repository/role.repository';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './module/user.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
