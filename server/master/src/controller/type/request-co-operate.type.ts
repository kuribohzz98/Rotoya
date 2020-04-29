import { ApiProperty } from '@nestjs/swagger';
import { BaseTypeGet } from './base.type';
import { ECoOperateStatus } from './../../entity/db.type';
import { RequestCoOperateAttribute } from './../../interface/attribute.interface';

export class TypeRequestCoOperate extends BaseTypeGet implements RequestCoOperateAttribute {
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
}