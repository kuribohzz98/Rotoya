import { ApiProperty } from '@nestjs/swagger';
import { SportGroundTimeSlotAttribute } from './../../interface/attribute.interface';
import { BaseTypeGet } from './base.type';

export class TypeSportGroundTimeSlot extends BaseTypeGet implements SportGroundTimeSlotAttribute {
    @ApiProperty({required: false})
    id: number;

    @ApiProperty({required: false})
    sportGroundId: number;

    @ApiProperty({required: false})
    startTime: number;

    @ApiProperty({required: false})
    endTime: number;

    @ApiProperty({required: false})
    price: number;
}