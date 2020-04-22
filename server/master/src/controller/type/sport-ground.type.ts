import { ApiProperty } from '@nestjs/swagger';
import { ITypeSportGround } from './../../interface/attribute.interface';

export class SportGroundType implements ITypeSportGround{
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

    @ApiProperty({required: false})
    page?: number;

    @ApiProperty({required: false})
    limit?: number;
}