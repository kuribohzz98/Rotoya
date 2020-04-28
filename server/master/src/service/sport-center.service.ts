import { Injectable } from '@nestjs/common';
import { TypePointFourDirection } from './../interface/map.interface';
import { OptionsFilterTimeSlotBlank } from './../interface/repository.interface';
import { SportCenterRepository } from './../repository/sportCenter.repository';
import { TypeQueryGetSportCenter, TypeQueryGetSportCenters } from './../interface/sport.interface';
import { SportCenterDataFindByRadius, SportCenterInfoDto } from './../dto/sportCenter.dto';
import { SportCenter } from './../entity/SportCenter.entity';
import { GetFullDate } from '../helper/utils/date';
import { convertTimeToFloat } from '../helper/utils/time';
import { cloneFilterObject } from '../helper/utils/common';
import { TypePostSportCenter } from './../controller/type/sport-center.type';

@Injectable()
export class SportCenterService {

    constructor(
        private readonly sportCenterRepository: SportCenterRepository
    ) { }

    switchSportCenterInfo(
        sportCenter: SportCenter,
        alias?: string
    ): SportCenterDataFindByRadius | SportCenterInfoDto {
        const sportCenterInfo = alias
            ? new SportCenterDataFindByRadius(sportCenter, alias)
            : new SportCenterInfoDto(sportCenter);
        return sportCenterInfo;
    }

    async getSportCenter(opts: TypeQueryGetSportCenter): Promise<SportCenterInfoDto> {
        opts.startDate = GetFullDate(opts.time);
        opts.endDate = GetFullDate(new Date(opts.time).getTime() + 1000 * 60 * 60 * 24 * 3);
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
                            amount: +raw[`count`]
                        })
                    }
                }
            }
        });
        result.sportGrounds.forEach(sportGround => sportGround.sportGroundTimeSlots.sort((a, b) => a.startTime - b.startTime));
        return result;
    }

    async getSportCenters(
        query?: TypeQueryGetSportCenters
    ): Promise<(SportCenterDataFindByRadius | SportCenterInfoDto)[]> {
        const sportCenters = await this.sportCenterRepository.getSportCenters(query);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter));
    }

    async getSportCenterBySlotTimeBlank(
        sportId?: number,
        time?: number,
        options?: OptionsFilterTimeSlotBlank
    ): Promise<(SportCenterDataFindByRadius | SportCenterInfoDto)[]> {
        const bookingDate = GetFullDate(time);
        const timeStart = convertTimeToFloat(options && options.timeStart ? options.timeStart : time);
        const sportCenters = await this.sportCenterRepository.getSportCenterBySlotTimeBlank(sportId, bookingDate, timeStart, options);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter, this.sportCenterRepository.models.sport_center));
    }

    async getSportCentersByGeolocation(
        query: TypeQueryGetSportCenters,
        dataFilter: TypePointFourDirection
    ): Promise<(SportCenterDataFindByRadius | SportCenterInfoDto)[]> {
        const sportCenters = await this.sportCenterRepository.getSportCenterByGeolocation(query, dataFilter);
        return sportCenters.map(sportCenter => this.switchSportCenterInfo(sportCenter, this.sportCenterRepository.models.sport_center));
    }

    async post(body: TypePostSportCenter) {
        const entity = cloneFilterObject(body, ['sports']) as SportCenter;
        entity.country = 'Việt Nam';
        try {
            const sportCenter = await this.sportCenterRepository.save<SportCenter>(entity);
            await Promise.all(
                body.sports.map(sport => {
                    return this.sportCenterRepository.getRepository('sport_sportcenter')
                        .save({ sportCenterId: sportCenter.id, sportId: +sport });
                })
            )
        } catch(e) {
            console.log(e);
            return false;
        }
        return true;
    }
}