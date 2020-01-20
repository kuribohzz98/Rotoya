import { AliasQuery } from './../constants/model.constants';
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

    async getSportCenterInRadius(lat: number, lng: number, distance: number, dataFilter: TypePointFourDirection) {
        const data = await this.sportCenterRepository.getSportCenterInRadius(HAVERSINE.R_Earth, distance, lat, lng, AliasQuery, dataFilter);
        return data.map(dataMap => new SportCenterDataFindByRadius(dataMap, AliasQuery));
    }

    async getSportCenterInRadiusBySport(lat: number, lng: number, distance: number, sport: string, dataFilter: TypePointFourDirection) {
        const data = await this.sportCenterRepository.getSportCenterInRadiusBySport(HAVERSINE.R_Earth, distance, lat, lng, AliasQuery, sport, dataFilter);
        return data.map(dataMap => new SportCenterDataFindByRadius(dataMap, AliasQuery));
    }
}