import { ECoOperateStatus } from './../../entity/db.type';
import { ITypeRequestCoOperate } from './../../interface/attribute.interface';
import { ApiProperty } from '@nestjs/swagger';

export class TypeRequestCoOperate implements ITypeRequestCoOperate {
    @ApiProperty({ required: false })
    id: number;

    @ApiProperty({ required: false })
    status: ECoOperateStatus;
    
    @ApiProperty({ required: false })
    firstName: string;
    
    @ApiProperty({ required: false })
    lastName: string;
    
    @ApiProperty({ required: false })
    phone: string;
    
    @ApiProperty({ required: false })
    email: string;
    
    @ApiProperty({ required: false })
    city: string;
    
    @ApiProperty({ required: false })
    district: string;
    
    @ApiProperty({ required: false })
    commune: string;
    
    @ApiProperty({ required: false })
    address: string;
    
    @ApiProperty({ required: false })
    note: string;

    @ApiProperty({required: false})
    page: number;

    @ApiProperty({required: false})
    limit: number;
}