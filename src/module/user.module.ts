import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './../repository/role.repository';
import { UserRepository } from './../repository/user.repository';
import { UserController } from './../controller/user.controller';
import { UserService } from './../service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
