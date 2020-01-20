import { AliasQuery } from './../constants/model.constants';
import { HAVERSINE } from './../constants/map.constants';
import { TypePointFourDirection } from './../interface/map.interface';
import { TypePositionMapAndDistance } from '../interface/map.interface';
import { ConfigService } from './../config/config.service';
import { SportDto } from './../dto/sport.dto';
import { SportRepository } from './../repository/sport.repository';
import { SportCenterInfoDto, SportCenterDataFindByRadius } from './../dto/sportCenter.dto';
import { SportCenterRepository } from '../repository/sportCenter.repository';
import { Injectable } from "@nestjs/common";
import * as fs from 'fs';

@Injectable()
export class SportService {
    constructor(
        private readonly sportCenterRepository: SportCenterRepository,
        private readonly sportRepository: SportRepository,
        private readonly configService: ConfigService
    ) { }

    async getSportCenter(id: number) {
        const sportCenter = await this.sportCenterRepository.getSportCenter({ id });
        return new SportCenterInfoDto(sportCenter);
    }

    async getSports() {
        const sports = await this.sportRepository.find();
        return sports.map(sport => new SportDto(sport));
    }

    async getAllSportCenter() {
        const sportCenters = await this.sportCenterRepository.find();
        return sportCenters.map(sportCenter => {
            const sportCenterInfo = new SportCenterInfoDto(sportCenter);
            if (sportCenterInfo.avatar) {
                const img = fs.readFileSync(this.configService.get('path_file_upload') + sportCenterInfo.avatar);
                if (img) {
                    sportCenterInfo.avatar = img.toString('base64');
                }
            }
            return sportCenterInfo;
        })
    }

    async getSportCenterBySport(sport: string) {
        const sportCenters = await this.sportCenterRepository.getSportCentersBySport(sport);
        return sportCenters.map(sportCenter => {
            const sportCenterInfo = new SportCenterInfoDto(sportCenter);
            if (sportCenterInfo.avatar) {
                const img = fs.readFileSync(this.configService.get('path_file_upload') + sportCenterInfo.avatar);
                if (img) {
                    sportCenterInfo.avatar = img.toString('base64');
                }
            }
            return sportCenterInfo;
        })
    }

    async getSportCenterBySlotTimeBlank(sportId?: number, timeStart?: number, options?: TypePositionMapAndDistance) {
        const query = await this.sportCenterRepository.getSportCenterBySlotTimeBlank(1, '2020-01-19', 7.00);
        console.log(query);
        return query;
    }

    async getSportCenterInRadius(lat: number, lng: number, distance: number, dataFilter: TypePointFourDirection) {
        const data = await this.sportCenterRepository.getSportCenterInRadius(HAVERSINE.R_Earth, distance, lat, lng, AliasQuery, dataFilter);
        return data.map(dataMap => new SportCenterDataFindByRadius(dataMap, AliasQuery));
    }

    async getSportCenterInRadiusBySport(lat: number, lng: number, distance: number, sport: string, dataFilter: TypePointFourDirection) {
        const data = await this.sportCenterRepository.getSportCenterInRadiusBySport(HAVERSINE.R_Earth, distance, lat, lng, AliasQuery, sport, dataFilter);
        return data.map(dataMap => new SportCenterDataFindByRadius(dataMap, AliasQuery));
    }
} 