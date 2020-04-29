import { ApiProperty } from '@nestjs/swagger';
import { SportGroundAttribute } from './../../interface/attribute.interface';
import { BaseTypeGet } from './base.type';

export class SportGroundType extends BaseTypeGet implements SportGroundAttribute{
    @ApiProperty({required: false})
    id: number;
    
    @ApiProperty({required: false})
    name: string;

    @ApiProperty({required: false})
    code: string;
    
    @ApiProperty({required: false})
    sportCenterId: number;
    
    @ApiProperty({required: false})
    sportId: number;
    
    @ApiProperty({required: false})
    type: string;
    
    @ApiProperty({required: false})
    avatar: string;
    
    @ApiProperty({required: false})
    quantity: number;
    
    @ApiProperty({required: false})
    description: string;
}