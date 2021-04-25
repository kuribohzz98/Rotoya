import { EntityRepository } from 'typeorm';
import { SportEquipment } from './../entity/SportEquipment.entity';
import { SportEquipmentAttribute } from './../interface/attribute.interface';
import { BaseRepository } from './../base/BaseRepository';

@EntityRepository(SportEquipment)
export class SportEquipmentRepository extends BaseRepository<
  SportEquipment,
  SportEquipmentAttribute
> {}
