import { DtoMapper, MapFrom } from './../base/BaseDtoMapper';

export class SportDto extends DtoMapper {
    @MapFrom()
    id?: number;

    @MapFrom()
    name?: string;

    @MapFrom()
    code?: string;
}