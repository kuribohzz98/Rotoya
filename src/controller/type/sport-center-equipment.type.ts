import { ApiProperty } from '@nestjs/swagger';
import { SportCenterEquipmentAttribute } from './../../interface/attribute.interface';
import { BaseTypeGet } from './base.type';

export class SportCenterEquipmentType extends BaseTypeGet implements SportCenterEquipmentAttribute{
    @ApiProperty({required: false})
    id: number;

    @ApiProperty({required: false})
    sportCenterId: number;

    @ApiProperty({required: false})
    sportEquipmentId: number;

    @ApiProperty({required: false})
    sportId: number;
}