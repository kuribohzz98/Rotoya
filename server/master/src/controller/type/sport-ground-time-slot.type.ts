import { ApiProperty } from '@nestjs/swagger';
import { ITypeSportGroundTimeSlot } from './../../interface/attribute.interface';

export class TypeSportGroundTimeSlot implements ITypeSportGroundTimeSlot {
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

    @ApiProperty({required: false})
    page: number;

    @ApiProperty({required: false})
    limit: number;
}