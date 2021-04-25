import { ApiProperty } from '@nestjs/swagger';
import { UserAttribute } from './../../interface/attribute.interface';
import { BaseTypeGet } from './base.type';
import { EUserStatus } from './../../entity/db.type';

export class UserType extends BaseTypeGet implements UserAttribute {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: false })
  username: string;

  @ApiProperty({ required: false })
  type: string;

  @ApiProperty({ enum: EUserStatus, required: false })
  status: EUserStatus;

  @ApiProperty({ required: false })
  isNew: boolean;
}
