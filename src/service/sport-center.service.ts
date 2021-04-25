import { Injectable } from '@nestjs/common';
import { TypePointFourDirection } from './../interface/map.interface';
import { OptionsFilterTimeSlotBlank } from './../interface/repository.interface';
import { SportCenterRepository } from './../repository/sportCenter.repository';
import {
  TypeQueryGetSportCenter,
  TypeQueryGetSportCenters,
} from './../interface/sport.interface';
import {
  SportCenterDataFindByRadius,
  SportCenterInfoDto,
} from './../dto/sportCenter.dto';
import { SportCenter } from './../entity/SportCenter.entity';
import { GetFullDate } from '../helper/utils/date';
import { convertTimeToFloat } from '../helper/utils/time';
import { cloneFilterObject } from '../helper/utils/common';
import { TypePostSportCenter } from './../controller/type/sport-center.type';
import { SportCenterSport } from '../entity/SportCenterSport.entity';

@Injectable()
export class SportCenterService {
  constructor(private readonly sportCenterRepository: SportCenterRepository) {}

  switchSportCenterInfo(
    sportCenter: SportCenter,
    alias?: string,
  ): SportCenterDataFindByRadius | SportCenterInfoDto {
    const sportCenterInfo = alias
      ? new SportCenterDataFindByRadius(sportCenter, alias)
      : new SportCenterInfoDto(sportCenter);
    return sportCenterInfo;
  }

  async getSportCenter(
    opts: TypeQueryGetSportCenter,
  ): Promise<SportCenterInfoDto> {
    opts.startDate = GetFullDate(opts.time);
    opts.endDate = GetFullDate(opts.time);
    const sportCenter = await this.sportCenterRepository.getSportCenter(opts);
    const result = new SportCenterInfoDto(sportCenter.entities[0]);
    sportCenter.raw.map(raw => {
      const sportGround = result.sportGrounds.find(
        sportGround =>
          sportGround.id ==
          raw[`${this.sportCenterRepository.models.sport_ground}_id`],
      );
      if (sportGround) {
        const timeSlot = sportGround.sportGroundTimeSlots.find(
          sgTimeSlot =>
            sgTimeSlot.id ==
            raw[
              `${this.sportCenterRepository.models.sport_ground_time_slot}_id`
            ],
        );
        if (timeSlot) {
          if (raw[`count`]) {
            const saved = timeSlot.bookeds.find(
              booked =>
                new Date(booked.date).getTime() ==
                new Date(
                  raw[
                    `${this.sportCenterRepository.models.booking}_bookingDate`
                  ],
                ).getTime(),
            );
            !saved &&
              timeSlot.bookeds.push({
                date:
                  raw[
                    `${this.sportCenterRepository.models.booking}_bookingDate`
                  ],
                amount: +raw[`count`],
              });
          }
          if (
            raw[
              `${this.sportCenterRepository.models.sport_center_equipment_booking}_id`
            ]
          ) {
            const sceBooking = this.sportCenterRepository.models
              .sport_center_equipment_booking;
            const saved = timeSlot.sportCenterEquipmentBookings.find(
              _ => _.id == raw[`${sceBooking}_id`],
            );
            !saved &&
              timeSlot.sportCenterEquipmentBookings.push({
                id: raw[`${sceBooking}_id`],
                sportCenterEquipmentId:
                  raw[`${sceBooking}_sportCenterEquipmentId`],
                bookingId: raw[`${sceBooking}_bookingId`],
                price: raw[`${sceBooking}_price`],
                amount: raw[`${sceBooking}_amount`],
              });
          }
        }
      }
    });
    result.sportGrounds.forEach(sportGround =>
      sportGround.sportGroundTimeSlots.sort(
        (a, b) => a.startTime - b.startTime,
      ),
    );
    return result;
  }

  async getSportCenters(
    query?: TypeQueryGetSportCenters,
  ): Promise<(SportCenterDataFindByRadius | SportCenterInfoDto)[]> {
    const sportCenters = await this.sportCenterRepository.getSportCenters(
      query,
    );
    return sportCenters.map(sportCenter =>
      this.switchSportCenterInfo(sportCenter),
    );
  }

  async getSportCenterBySlotTimeBlank(
    sportId?: number,
    time?: number,
    options?: OptionsFilterTimeSlotBlank,
  ): Promise<(SportCenterDataFindByRadius | SportCenterInfoDto)[]> {
    const bookingDate = GetFullDate(time);
    const timeStart = convertTimeToFloat(
      options && options.timeStart ? options.timeStart : time,
    );
    const sportCenters = await this.sportCenterRepository.getSportCenterBySlotTimeBlank(
      sportId,
      bookingDate,
      timeStart,
      options,
    );
    return sportCenters.map(sportCenter =>
      this.switchSportCenterInfo(
        sportCenter,
        this.sportCenterRepository.models.sport_center,
      ),
    );
  }

  async getSportCentersByGeolocation(
    query: TypeQueryGetSportCenters,
    dataFilter: TypePointFourDirection,
  ): Promise<(SportCenterDataFindByRadius | SportCenterInfoDto)[]> {
    const sportCenters = await this.sportCenterRepository.getSportCenterByGeolocation(
      query,
      dataFilter,
    );
    return sportCenters.map(sportCenter =>
      this.switchSportCenterInfo(
        sportCenter,
        this.sportCenterRepository.models.sport_center,
      ),
    );
  }

  async post(body: TypePostSportCenter) {
    const entity = cloneFilterObject(body, ['sports']) as SportCenter;
    entity.country = 'Việt Nam';
    try {
      const sportCenter = await this.sportCenterRepository.save<SportCenter>(
        entity,
      );
      await Promise.all(
        body.sports.map(sport => {
          return this.sportCenterRepository
            .getRepository<SportCenterSport>('sport_sportcenter')
            .save({ sportCenterId: sportCenter.id, sportId: +sport });
        }),
      );
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  async update(body: TypePostSportCenter) {
    const entity = cloneFilterObject(body, ['sports', 'id']) as SportCenter;
    try {
      await this.sportCenterRepository.update({ id: +body.id }, entity);
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  async getSportCentersFavorites(userId: number) {
    const sportCenters = await this.sportCenterRepository.getSportCentersFavorites(
      userId,
    );
    return sportCenters.map(sportCenter =>
      this.switchSportCenterInfo(sportCenter),
    );
  }
}
