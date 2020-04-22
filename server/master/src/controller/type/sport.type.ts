import { ITypeSport } from './../../interface/sport.interface';
import { ApiProperty } from '@nestjs/swagger';

export class SportType implements ITypeSport{
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;

    @ApiProperty()
    page?: number;

    @ApiProperty()
    limit?: number;
}