import { Injectable } from "@nestjs/common";
import { SportAttribute } from './../interface/attribute.interface';
import { Sport } from './../entity/Sport.entity';
import { BaseService } from './../base/BaseService';
import { SportDto } from './../dto/sport.dto';
import { SportRepository } from './../repository/sport.repository';

@Injectable()
export class SportService
    extends BaseService<SportRepository, Sport, SportAttribute, SportDto> {

    constructor(
        private readonly sportRepository: SportRepository
    ) {
        super(sportRepository)
    }
    mapEntityToDto(entity: Sport): SportDto {
        return new SportDto(entity);
    }

} 