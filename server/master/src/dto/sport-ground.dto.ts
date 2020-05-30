import { DtoMapper, MapFrom } from './../base/BaseDtoMapper';
import { SportGroundAttribute } from './../interface/attribute.interface';
import { SportGroundTimeSlot, SportCenterInfoDto } from './sportCenter.dto';

export class SportGroundDto extends DtoMapper implements SportGroundAttribute {
    @MapFrom()
    id?: number;

    @MapFrom()
    name?: string;

    @MapFrom()
    code?: string;

    @MapFrom()
    sportCenterId?: number;
    
    @MapFrom()
    sportId?: number;
    
    @MapFrom()
    type?: string;
    
    @MapFrom()
    avatar?: string;
    
    @MapFrom()
    quantity?: number;
    
    @MapFrom()
    quantityInStock?: number;
    
    @MapFrom()
    description?: string;
}

export class SportGroundInfoDto extends DtoMapper {
    @MapFrom()
    id?: number;

    @MapFrom()
    sportId?: number;

    @MapFrom()
    name?: number;

    @MapFrom()
    code?: string;

    @MapFrom()
    type?: string;

    @MapFrom()
    avatar?: string;

    @MapFrom()
    quantity?: number;

    @MapFrom()
    description?: string;

    @MapFrom('sportGroundTimeSlots', SportGroundTimeSlot, true)
    sportGroundTimeSlots?: SportGroundTimeSlot[];

    @MapFrom('sportCenter', SportCenterInfoDto)
    sportCenter?: SportCenterInfoDto;
}