export interface TypePositionMap {
    longitude: number; // kinh do
    latitude: number; //vi do
}

export interface TypePositionMapAndDistance {
    longitude: number; // kinh do
    latitude: number; //vi do
    distance: number;
}

export interface TypePointFourDirection {
    pointNorth: TypePositionMap;
    pointEast: TypePositionMap;
    pointSouth: TypePositionMap;
    pointWest: TypePositionMap;
}

export interface TypePositionMapDistanceAndSport {
    longitude: number; // kinh do
    latitude: number; //vi do
    distance: number;
    sport: string;
}