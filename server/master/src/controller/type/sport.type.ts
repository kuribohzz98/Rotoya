import { ApiProperty } from '@nestjs/swagger';
import { SportAttribute } from './../../interface/attribute.interface';
import { BaseTypeGet } from './base.type';

export class SportType extends BaseTypeGet implements SportAttribute{
    @ApiProperty({required: false})
    id: number;

    @ApiProperty({required: false})
    name: string;

    @ApiProperty({required: false})
    code: string;

}