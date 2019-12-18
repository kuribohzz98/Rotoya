import { HAVERSINE } from './../constants/haversine.constants';
import { TypePositionMap, TypePositionMapAndDistance } from './../interface/type.interface';

// fomular converted to address https://www.movable-type.co.uk/scripts/latlong.html

export function toRadian(x: number): number {
    return x * (Math.PI / 180);
}

export function toDegrees(x: number): number {
    return x * (180 / Math.PI);
}

export function haversineDistance(x: TypePositionMap, y: TypePositionMap): number {
    let R = HAVERSINE.R_Earth;
    let rlat1 = toRadian(x.latitude); // Convert degrees to radians
    let rlat2 = toRadian(y.latitude); // Convert degrees to radians
    let difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = toRadian(y.longitude - x.longitude); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(
        Math.sqrt(
            Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)
        )
    );
    return d;
}

export function destinationPointGivenDistanceAndBearingFromStartPoint(
    startPoint: TypePositionMapAndDistance,
    bearing: number //radians
): TypePositionMap {
    let R = HAVERSINE.R_Earth;
    let latStartPoint = toRadian(startPoint.latitude) //Current lat point converted to radians
    let lonStartPoint = toRadian(startPoint.longitude) //Current long point converted to radians

    let endPoint = {} as TypePositionMap;
    const cosDistanceR = Math.cos(startPoint.distance / R);
    const sinDistanceR = Math.sin(startPoint.distance / R);

    endPoint.latitude = Math.asin(Math.sin(latStartPoint) * cosDistanceR +
        Math.cos(latStartPoint) * sinDistanceR * Math.cos(bearing));

    endPoint.longitude = lonStartPoint + Math.atan2(Math.sin(bearing) * sinDistanceR * Math.cos(latStartPoint),
        cosDistanceR - (Math.sin(latStartPoint) * Math.sin(endPoint.latitude)));

    endPoint.latitude = toDegrees(endPoint.latitude);
    endPoint.longitude = toDegrees(endPoint.longitude);

    return endPoint;
}