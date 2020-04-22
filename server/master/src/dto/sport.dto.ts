import { DtoMapper, MapFrom } from './../base/BaseDtoMapper';
import { SportAttribute } from './../interface/attribute.interface';

export class SportDto extends DtoMapper implements SportAttribute {
    @MapFrom()
    id?: number;

    @MapFrom()
    name?: string;

    @MapFrom()
    code?: string;
}