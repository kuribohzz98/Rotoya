import { SportDto } from './sport.dto';
import { DtoMapper, MapFrom } from './../base/BaseDtoMapper';

export class SportCenterDataFindByRadius {
    constructor(data, alias: string = "") {
        this.id = data[`${alias}_id`] || data.id;
        this.name = data[`${alias}_name`] || data.name;
        this.code = data[`${alias}_code`] || data.code;
        this.country = data[`${alias}_country`] || data.country;
        this.city = data[`${alias}_city`] || data.city;
        this.district = data[`${alias}_district`] || data.district;
        this.commune = data[`${alias}_commune`] || data.commune;
        this.address = data[`${alias}_address`] || data.address;
        this.latitude = data[`${alias}_latitude`] || data.latitude;
        this.longitude = data[`${alias}_longitude`] || data.longitude;
        this.distance = data[`${alias}_distance`] || data.distance;
        this.timeOpen = data[`${alias}_timeOpen`] || data.timeOpen;
        this.timeClose = data[`${alias}_timeClose`] || data.timeClose;
        this.avatar = data[`${alias}_avatar`] || data.avatar;
    }
    id?: number;
    name?: string;
    code?: string;
    country?: string;
    city?: string;
    avatar?: string;
    district?: string;
    commune?: string;
    address?: string;
    timeOpen?: number;
    timeClose?: number;
    latitude?: number;
    longitude?: number;
    distance?: number;
}

class Booked {
    date: string;
    amount: number;
}

class SportGroundTimeSlot extends DtoMapper {
    @MapFrom()
    id?: number;

    @MapFrom()
    startTime?: number;

    @MapFrom()
    endTime?: number;

    @MapFrom()
    price?: number;

    bookeds?: Booked[] = [];
}

class SportGround extends DtoMapper {
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
}

export class SportCenterInfoDto extends DtoMapper {
    @MapFrom()
    id?: number;

    @MapFrom()
    userId?: number;

    @MapFrom()
    name?: string;

    @MapFrom()
    code?: string;

    @MapFrom()
    country?: string;

    @MapFrom()
    city?: string;

    @MapFrom()
    district?: string;

    @MapFrom()
    commune?: string;

    @MapFrom()
    address?: string;

    @MapFrom()
    avatar?: string;

    @MapFrom()
    timeOpen?: number;

    @MapFrom()
    timeClose?: number;

    @MapFrom()
    latitude?: number;

    @MapFrom()
    longitude?: number;

    @MapFrom('sportGrounds', SportGround, true)
    sportGrounds?: SportGround[];

    @MapFrom('sports', SportDto, true)
    sports: SportDto[];
}