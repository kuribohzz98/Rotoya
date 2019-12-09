import { UserRepository } from './../repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './../controller/user.controller';
import { UserService } from './../service/user.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository])
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }
