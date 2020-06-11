import { SportEquipmentRepository } from './../repository/sport-equipment.repository';
import { Injectable } from "@nestjs/common";
import { SportEquipmentAttribute } from './../interface/attribute.interface';
import { BaseService } from './../base/BaseService';
import { SportDto } from './../dto/sport.dto';
import { SportRepository } from './../repository/sport.repository';
import { SportEquipment } from './../entity/SportEquipment.entity';

@Injectable()
export class SportEquipmentService
    extends BaseService<SportEquipmentRepository, SportEquipment, SportEquipmentAttribute> {

    constructor(
        private readonly sportEquipmentRepository: SportEquipmentRepository
    ) {
        super(sportEquipmentRepository)
    }
    
    mapEntityToDto(entity: SportEquipment): SportEquipment {
        return entity;
    }

} 