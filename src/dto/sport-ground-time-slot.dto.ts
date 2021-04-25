import { DtoMapper, MapFrom } from './../base/BaseDtoMapper';
import { SportGroundTimeSlotAttribute } from './../interface/attribute.interface';

export class SportGroundTimeSlotDto extends DtoMapper
  implements SportGroundTimeSlotAttribute {
  @MapFrom()
  id: number;

  @MapFrom()
  sportGroundId: number;

  @MapFrom()
  startTime: number;

  @MapFrom()
  endTime: number;

  @MapFrom()
  price: number;
}
