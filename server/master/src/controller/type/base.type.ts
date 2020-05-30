import { ApiProperty } from '@nestjs/swagger';
import { SortType } from './../../constants/model.constants';
import { OptionsPaging } from './../../interface/repository.interface';

export class BaseTypeGet implements OptionsPaging {
    @ApiProperty({ required: false })
    limit: number;

    @ApiProperty({ required: false })
    page: number;

    @ApiProperty({required: false})
    sort: string;

    @ApiProperty({required: false, enum: SortType})
    sortType: SortType;

    @ApiProperty({required: false})
    count: boolean;
}