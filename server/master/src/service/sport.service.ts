import { convertTimeToFloat } from '../helper/utils/time';
import { SportCenter } from './../entity/SportCenter.entity';
import { OptionsFilterTimeSlotBlank } from './../interface/repository.interface';
import { HAVERSINE } from './../constants/map.constants';
import { TypePointFourDirection } from './../interface/map.interface';
import { ConfigService } from './../config/config.service';
import { SportDto } from './../dto/sport.dto';
import { SportRepository } from './../repository/sport.repository';
import { SportCenterInfoDto, SportCenterDataFindByRadius } from './../dto/sportCenter.dto';
import { SportCenterRepository } from '../repository/sportCenter.repository';
import { Injectable } from "@nestjs/common";
import { GetFullDate } from '../helper/utils/date';
import { readFileImg } from '../helper/tools/file';

@Injectable()
export class SportService {
    constructor(
        private readonly sportCenterRepository: SportCenterRepository,
        private readonly sportRepository: SportRepository,
        private readonly configService: ConfigService
    ) { }

    switchSportCenterInfo(sportCenter: SportCenter, alias?: string) {
        const sportCenterInfo = alias
            ? new SportCenterDataFindByRadius(sportCenter, alias)
            : new SportCenterInfoDto(sportCenter);
        if (sportCenterInfo.avatar) {
            sportCenterInfo.avatar = readFileImg(this.configService.get('path_file_upload') + sportCenterInfo.avatar)
        }
        return sportCenterInfo;
    }

    async getSportCenter(id: number) {
        const sportCenter = await this.sportCenterRepository.getOneByOptions({ id });
        return new SportCenterInfoDto(sportCenter);
    }

    async getSports() {
        const sports = await this.sportRepository.find();
        return sports.map(sport => new SportDto(sport));
    }

    async getAllSportCenter() {
        const sportCenters = await this.sportCenterRepository.find();
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter));
    }

    async getSportCenterBySport(sport: string) {
        const sportCenters = await this.sportCenterRepository.getSportCentersBySport(sport);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter));
    }

    async getSportCenterBySlotTimeBlank(sportId?: number, time?: number, options?: OptionsFilterTimeSlotBlank) {
        const bookingDate = GetFullDate(time);
        const timeStart = convertTimeToFloat(options && options.timeStart ? options.timeStart : time);
        const sportCenters = await this.sportCenterRepository.getSportCenterBySlotTimeBlank(sportId, bookingDate, timeStart, options);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter, this.sportCenterRepository.models.sport_center));
    }

    async getSportCenterInRadius(lat: number, lng: number, distance: number, dataFilter: TypePointFourDirection) {
        const sportCenters = await this.sportCenterRepository.getSportCenterInRadius(HAVERSINE.R_Earth, distance, lat, lng, dataFilter);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter, this.sportCenterRepository.models.sport_center));
    }

    async getSportCenterInRadiusBySport(lat: number, lng: number, distance: number, sport: string, dataFilter: TypePointFourDirection) {
        const sportCenters = await this.sportCenterRepository.getSportCenterInRadiusBySport(HAVERSINE.R_Earth, distance, lat, lng, sport, dataFilter);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter, this.sportCenterRepository.models.sport_center));
    }
} 