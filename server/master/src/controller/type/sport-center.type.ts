import { ApiProperty } from '@nestjs/swagger';
import { TypeQueryGetSportCenters } from './../../interface/sport.interface';
import { SportCenterAttribute } from './../../interface/attribute.interface';

export class TypeGetSportCenters implements TypeQueryGetSportCenters {
    @ApiProperty({ required: false })
    userId?: number;

    @ApiProperty({ description: '105.781477', required: false })
    longitude: number;

    @ApiProperty({ description: '21.037671', required: false })
    latitude: number;

    @ApiProperty({ required: false })
    distance: number;

    @ApiProperty({ required: false })
    sportId?: number;

    @ApiProperty({ required: false })
    sport?: string;

    @ApiProperty({ description: new Date().getTime().toString(), required: false })
    time?: number;
    
    @ApiProperty({ required: false })
    limit?: number;

    @ApiProperty({ required: false })
    page?: number;

    @ApiProperty({ required: false })
    isTimeSlotBlank?: boolean;

    @ApiProperty({ required: false })
    isByLocation?: boolean;

}

export class TypePostSportCenter implements SportCenterAttribute {
    @ApiProperty({ required: true })
    name: string;

    @ApiProperty({ required: true })
    city: string;

    @ApiProperty({ required: true })
    district: string;

    @ApiProperty({ required: true })
    commune: string;

    @ApiProperty({ required: false })
    address: string;

    @ApiProperty({ required: true })
    timeOpen: number;

    @ApiProperty({ required: true })
    timeClose: number;

    @ApiProperty({ required: true })
    userId: number;

    @ApiProperty({ description: '105.781477', required: true })
    longitude: number;

    @ApiProperty({ description: '21.037671', required: true })
    latitude: number;

    @ApiProperty({ required: true })
    sports: number[];

}