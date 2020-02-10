import { convertTimeToFloat } from '../helper/utils/time';
import { SportCenter } from './../entity/SportCenter.entity';
import { OptionsFilterTimeSlotBlank, OptionsPaging } from './../interface/repository.interface';
import { HAVERSINE } from './../constants/map.constants';
import { TypePointFourDirection, TypePositionMapDistanceAndSport, TypePositionMapAndDistance } from './../interface/map.interface';
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

    async getAllSportCenter(opts?: OptionsPaging) {
        const sportCenters = await this.sportCenterRepository.getSportCenters(opts);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter));
    }

    async getSportCenterBySport(sport: string, opts?: OptionsPaging) {
        const sportCenters = await this.sportCenterRepository.getSportCentersBySport(sport, opts);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter));
    }

    async getSportCenterBySlotTimeBlank(sportId?: number, time?: number, options?: OptionsFilterTimeSlotBlank) {
        const bookingDate = GetFullDate(time);
        const timeStart = convertTimeToFloat(options && options.timeStart ? options.timeStart : time);
        const sportCenters = await this.sportCenterRepository.getSportCenterBySlotTimeBlank(sportId, bookingDate, timeStart, options);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter, this.sportCenterRepository.models.sport_center));
    }

    async getSportCenterInRadius(options: TypePositionMapAndDistance, dataFilter: TypePointFourDirection) {
        const sportCenters = await this.sportCenterRepository.getSportCenterInRadius(HAVERSINE.R_Earth, options, dataFilter);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter, this.sportCenterRepository.models.sport_center));
    }

    async getSportCenterInRadiusBySport(options: TypePositionMapDistanceAndSport, dataFilter: TypePointFourDirection) {
        const sportCenters = await this.sportCenterRepository.getSportCenterInRadiusBySport(HAVERSINE.R_Earth, options, dataFilter);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter, this.sportCenterRepository.models.sport_center));
    }
} 