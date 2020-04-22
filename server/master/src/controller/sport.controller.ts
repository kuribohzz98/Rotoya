import { SportType } from './type/sport.type';
import { SportDto } from './../dto/sport.dto';
import { SportAttribute } from './../interface/attribute.interface';
import { Sport } from './../entity/Sport.entity';
import { SportRepository } from './../repository/sport.repository';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from './../base/BaseController';
import { SportService } from './../service/sport.service';

@ApiTags('sport')
@Controller('sport')
export class SportController extends
  BaseController<SportService, SportRepository, Sport, SportAttribute, SportType, SportDto> {
  constructor(
    private readonly sportService: SportService
  ) {
    super(sportService);
  }

}
