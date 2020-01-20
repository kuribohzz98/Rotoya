import { DtoMapper, MapFrom } from './../base/BaseDtoMapper';
import { EUserStatus } from './../entity/db.type';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

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

class UserInfo extends DtoMapper {
    @MapFrom()
    firstName: string;

    @MapFrom()
    lastName: string;

    @MapFrom()
    phone: number;

    @MapFrom()
    address: string;

    @MapFrom()
    email: string;

    @MapFrom()
    gender: string;
}

class UserMeta extends DtoMapper {
    @MapFrom()
    avatar: string;
}

export class UserProfileDto extends DtoMapper{
    @MapFrom()
    id: number;

    @MapFrom()
    username: string;

    @MapFrom('userInfo', UserInfo)
    userInfo: UserInfo;

    @MapFrom('userMeta', UserMeta)
    userMeta: UserMeta;
}