import { ApiProperty } from '@nestjs/swagger';
import { SportEquipmentAttribute } from './../../interface/attribute.interface';
import { BaseTypeGet } from './base.type';

export class SportEquipmentType extends BaseTypeGet
  implements SportEquipmentAttribute {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: false })
  sportId: number;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  image: string;

  @ApiProperty({ required: false })
  description: string;
}
