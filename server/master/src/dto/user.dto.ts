import { EUserStatus } from './../entity/db.type';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
    @ApiProperty()
    username?: string;

    @ApiProperty()
    password?: string;

    @ApiProperty()
    type?: string;
}

export class UserLoginDto {
    @ApiProperty()
    username?: string;

    @ApiProperty()
    password?: string;

}