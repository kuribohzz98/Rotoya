import { TypePointFourDirection } from './../interface/map.interface';
import { SportCenterDataFindByRadius } from '../dto/sportCenter.dto';
import { HAVERSINE } from './../constants/map.constants';
import { SportCenterRepository } from '../repository/sportCenter.repository';
import { Injectable } from "@nestjs/common";

@Injectable()
export class MapService {
    constructor(
        private readonly sportCenterRepository: SportCenterRepository
    ) { }

    // async getSportCenterInRadius(lat: number, lng: number, distance: number, dataFilter: TypePointFourDirection) {
    //     const data = await this.sportCenterRepository.getSportCenterInRadius(HAVERSINE.R_Earth, distance, lat, lng, dataFilter);
    //     return data.map(dataMap => new SportCenterDataFindByRadius(dataMap, this.sportCenterRepository.models.sport_center));
    // }

    // async getSportCenterInRadiusBySport(lat: number, lng: number, distance: number, sport: string, dataFilter: TypePointFourDirection) {
    //     const data = await this.sportCenterRepository.getSportCenterInRadiusBySport(HAVERSINE.R_Earth, distance, lat, lng, sport, dataFilter);
    //     return data.map(dataMap => new SportCenterDataFindByRadius(dataMap, this.sportCenterRepository.models.sport_center));
    // }
}