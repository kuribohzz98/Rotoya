export interface TypePositionMap {
    longitude: number; // kinh do
    latitude: number; //vi do
}

export interface TypePositionMapAndDistance {
    longitude: number; // kinh do
    latitude: number; //vi do
    distance: number;
}

export interface TypeWorkerData<T> {
    path: string;
    data: T;
}

export interface TypePointFourDirection {
    pointNorth: TypePositionMap;
    pointEast: TypePositionMap;
    pointSouth: TypePositionMap;
    pointWest: TypePositionMap;
}