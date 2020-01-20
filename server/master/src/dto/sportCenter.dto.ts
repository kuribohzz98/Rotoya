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
    }
    id?: number;
    name?: string;
    code?: string;
    country?: string;
    city?: string;
    district?: string;
    commune?: string;
    address?: string;
    timeOpen?: number;
    timeClose?: number;
    latitude?: number;
    longitude?: number;
    distance?: number;
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
}