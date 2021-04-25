import { OptionsPaging } from './repository.interface';
export interface TypePositionMap {
  longitude: number; // kinh do
  latitude: number; //vi do
}

export interface TypePositionMapAndDistance extends OptionsPaging {
  longitude?: number; // kinh do
  latitude?: number; //vi do
  distance?: number;
}

export interface TypePointFourDirection {
  pointNorth: TypePositionMap;
  pointEast: TypePositionMap;
  pointSouth: TypePositionMap;
  pointWest: TypePositionMap;
}
