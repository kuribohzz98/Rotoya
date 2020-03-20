import { TypePositionMapAndDistance } from './map.interface';

export interface TypeQueryGetSportCenters extends TypePositionMapAndDistance {
    sport?: string;
    sportId?: number;
    time?: number;
    isTimeSlotBlank?: boolean;
    isByLocation?: boolean;
}

export interface TypeQueryGetSportCenter {
    id?: number;
    time?: number;
    startDate?: string;
    endDate?: string;
}