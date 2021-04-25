import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from './../base/BaseController';
import { SportGroundTimeSlotDto } from './../dto/sport-ground-time-slot.dto';
import { TypeSportGroundTimeSlot } from './type/sport-ground-time-slot.type';
import { SportGroundTimeSlotService } from './../service/sport-gound-time-slot.service';

@ApiTags('Sport ground time slot')
@Controller('sport-ground-time-slot')
export class SportGroundTimeSlotController extends BaseController<
  SportGroundTimeSlotService,
  TypeSportGroundTimeSlot,
  SportGroundTimeSlotDto
> {
  constructor(private readonly timeSlotService: SportGroundTimeSlotService) {
    super(timeSlotService);
  }

  @Get()
  async get(@Query() query: TypeSportGroundTimeSlot) {
    const data = await this.getBase(query);
    return data;
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.getOneBase(id);
    return data;
  }

  @Post()
  async create(@Body() body: TypeSportGroundTimeSlot) {
    const data = await this.createBase(body);
    return data;
  }

  @Put()
  async put(@Body() body: TypeSportGroundTimeSlot) {
    const data = await this.putBase(body);
    return data;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const data = await this.deleteBase(id);
    return data;
  }

  @Post('multi')
  async createMulti(@Body() body: any) {
    const dataBody = Object.values(body).map(
      value => value,
    ) as TypeSportGroundTimeSlot[];
    const data = await this.createManyBase(dataBody);
    return data;
  }
}
