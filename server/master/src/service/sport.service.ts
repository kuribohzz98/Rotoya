import { convertTimeToFloat } from '../helper/utils/time';
import { SportCenter } from './../entity/SportCenter.entity';
import { OptionsFilterTimeSlotBlank } from './../interface/repository.interface';
import { TypePointFourDirection } from './../interface/map.interface';
import { TypeQueryGetSportCenters, TypeQueryGetSportCenter } from './../interface/sport.interface';
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
        public readonly sportCenterRepository: SportCenterRepository,
        private readonly sportRepository: SportRepository,
        private readonly configService: ConfigService
    ) { }

    switchSportCenterInfo(sportCenter: SportCenter, alias?: string) {
        const sportCenterInfo = alias
            ? new SportCenterDataFindByRadius(sportCenter, alias)
            : new SportCenterInfoDto(sportCenter);
        // if (sportCenterInfo.avatar) {
        //     sportCenterInfo.avatar = readFileImg(this.configService.get('path_file_upload') + sportCenterInfo.avatar);
        // }
        return sportCenterInfo;
    }

    async getSportCenter(opts: TypeQueryGetSportCenter) {
        opts.startDate = GetFullDate(opts.time);
        opts.endDate = GetFullDate(new Date(opts.time).getTime() + 1000*60*60*24*3);
        const sportCenter = await this.sportCenterRepository.getSportCenter(opts);
        const result = new SportCenterInfoDto(sportCenter.entities[0]);
        sportCenter.raw.map(raw => {
            const sportGround = result.sportGrounds
                .find(sportGround => sportGround.id == raw[`${this.sportCenterRepository.models.sport_ground}_id`]);
            if (sportGround) {
                const timeSlot = sportGround.sportGroundTimeSlots
                    .find(sgTimeSlot => sgTimeSlot.id == raw[`${this.sportCenterRepository.models.sport_ground_time_slot}_id`]);
                if (timeSlot) {
                    if (raw[`count`]) {
                        timeSlot.bookeds.push({
                            date: raw[`${this.sportCenterRepository.models.booking}_bookingDate`],
                            amount: raw[`count`]
                        })
                    }
                }
            }
        });
        result.sportGrounds.forEach(sportGround => sportGround.sportGroundTimeSlots.sort((a,b) => a.startTime - b.startTime));
        return result;
    }

    async getSportCenters(query?: TypeQueryGetSportCenters) {
        const sportCenters = await this.sportCenterRepository.getSportCenters(query);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter));
    }

    async getSports() {
        const sports = await this.sportRepository.find();
        return sports.map(sport => new SportDto(sport));
    }

    async getSportCenterBySlotTimeBlank(sportId?: number, time?: number, options?: OptionsFilterTimeSlotBlank) {
        const bookingDate = GetFullDate(time);
        const timeStart = convertTimeToFloat(options && options.timeStart ? options.timeStart : time);
        const sportCenters = await this.sportCenterRepository.getSportCenterBySlotTimeBlank(sportId, bookingDate, timeStart, options);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter, this.sportCenterRepository.models.sport_center));
    }

    async getSportCentersByGeolocation(query: TypeQueryGetSportCenters, dataFilter: TypePointFourDirection) {
        const sportCenters = await this.sportCenterRepository.getSportCenterByGeolocation(query, dataFilter);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter, this.sportCenterRepository.models.sport_center));
    }
} 