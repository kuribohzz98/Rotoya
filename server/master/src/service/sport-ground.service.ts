import { Injectable } from "@nestjs/common";
import { SportGroundDto } from './../dto/sport-ground.dto';
import { SportGround } from './../entity/SportGround.entity';
import { SportGroundRepository } from './../repository/sport-ground.repository';
import { SportGroundAttribute } from './../interface/attribute.interface';
import { BaseService } from './../base/BaseService';

@Injectable()
export class SportGroundService
    extends BaseService<SportGroundRepository, SportGround, SportGroundAttribute, SportGroundDto> {

    constructor(
        private readonly sportGroundRepository: SportGroundRepository
    ) {
        super(sportGroundRepository)
    }
    mapEntityToDto(entity: SportGround): SportGroundDto {
        return new SportGroundDto(entity);
    }

} 