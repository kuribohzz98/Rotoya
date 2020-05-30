import { ApiProperty } from '@nestjs/swagger';
import { SportCenterFavoriteAttribute } from './../../interface/attribute.interface';
import { BaseTypeGet } from './base.type';

export class SportCenterFavoriteType extends BaseTypeGet implements SportCenterFavoriteAttribute{
    @ApiProperty({required: false})
    id: number;

    @ApiProperty({required: false})
    sportCenterId: number;

    @ApiProperty({required: false})
    userId: number;

}