import { RoleCode } from './../constants/auth.constants';
import { DtoMapper, MapFrom } from './../base/BaseDtoMapper';
import { EUserStatus } from './../entity/db.type';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserInfo extends DtoMapper {
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

export class UserMeta extends DtoMapper {
    @MapFrom()
    avatar: string;
}

export class UserProfileDto extends DtoMapper {
    @MapFrom()
    id: number;

    @MapFrom()
    username: string;

    @MapFrom()
    isNew: boolean;

    @MapFrom('userInfo', UserInfo)
    userInfo: UserInfo;

    @MapFrom('userMeta', UserMeta)
    userMeta: UserMeta;

    @MapFrom('roles', role => {
        return role.code;
    }, true)
    roles: string[];
}

export class UserCreateDto {
    @ApiProperty()
    username?: string;

    @ApiProperty()
    password?: string;

    @ApiProperty()
    type?: string;

    @ApiProperty()
    userInfo?: UserInfo;

    @ApiProperty({ type: 'enum', enum: RoleCode })
    roles?: RoleCode[];
}

export class UserLoginDto {
    @ApiProperty()
    username?: string;

    @ApiProperty()
    password?: string;

}