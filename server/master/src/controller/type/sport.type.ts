import { ApiProperty } from '@nestjs/swagger';
import { ITypeSport } from './../../interface/attribute.interface';

export class SportType implements ITypeSport{
    @ApiProperty({required: false})
    id: number;

    @ApiProperty({required: false})
    name: string;

    @ApiProperty({required: false})
    code: string;

    @ApiProperty({required: false})
    page?: number;

    @ApiProperty({required: false})
    limit?: number;
}