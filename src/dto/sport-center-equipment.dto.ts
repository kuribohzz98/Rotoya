import { DtoMapper, MapFrom } from './../base/BaseDtoMapper';

export class SportCenterEquipmentDto extends DtoMapper {
  @MapFrom()
  id?: number;

  @MapFrom('sportEquipment.sportId')
  sportId?: number;

  @MapFrom()
  sportCenterId?: number;

  @MapFrom()
  sportEquipmentId?: number;

  @MapFrom('sportEquipment.name')
  name?: number;

  @MapFrom()
  price?: string;

  @MapFrom()
  quantity?: string;

  @MapFrom('sportEquipment.image')
  image?: string;
}
