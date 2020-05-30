import { OptionsPaging } from './../interface/repository.interface';
import { SportCenterEquipmentType } from './../controller/type/sport-center-equipment.type';
import { Injectable } from "@nestjs/common";
import { SportCenterEquipmentDto } from './../dto/sport-center-equipment.dto';
import { SportCenterEquipment } from './../entity/SportCenterEquipment.entity';
import { SportCenterEquipmentRepository } from './../repository/sport-center-equipment.repository';
import { SportCenterEquipmentAttribute } from './../interface/attribute.interface';
import { BaseService } from './../base/BaseService';

@Injectable()
export class SportCenterEquipmentService
    extends BaseService<SportCenterEquipmentRepository, SportCenterEquipment, SportCenterEquipmentAttribute, SportCenterEquipmentDto> {

    constructor(
        private readonly sportCenterEquipmentRepository: SportCenterEquipmentRepository
    ) {
        super(sportCenterEquipmentRepository)
    }
    mapEntityToDto(entity: SportCenterEquipment): SportCenterEquipmentDto {
        return new SportCenterEquipmentDto(entity);
    }

    async get(opts?: SportCenterEquipmentType, page?: OptionsPaging): Promise<SportCenterEquipmentDto[] | [SportCenterEquipmentDto[], number]> {
        let data = [];
        if(opts.sportId && opts.sportCenterId) {
            data = await this.sportCenterEquipmentRepository.getBySportIdAndSportCenterId(opts.sportId, opts.sportCenterId);
        } else {
            data = await this.sportCenterEquipmentRepository.get(opts, page);
        }
        return this.mapEntitiesToDtos(data, page.count);
    }

} 