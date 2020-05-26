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
        if (role) return role.code;
    }, true)
    roles: string[];
}

export class UserCreateDto {
    @ApiProperty({ required: false })
    username: string;

    @ApiProperty({ required: false })
    password: string;

    @ApiProperty({ required: false })
    type: string;

    @ApiProperty({ required: false })
    userInfo: UserInfo;

    @ApiProperty({ type: [String], enum: RoleCode, required: false })
    roles: RoleCode[];
}

export class UserLoginDto {
    @ApiProperty()
    username?: string;

    @ApiProperty()
    password?: string;

}