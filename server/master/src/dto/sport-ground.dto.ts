import { DtoMapper, MapFrom } from './../base/BaseDtoMapper';
import { SportGroundAttribute } from './../interface/attribute.interface';

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