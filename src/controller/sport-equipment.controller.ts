import { SportEquipmentType } from './type/sport-equipment.type';
import { SportEquipmentService } from './../service/sport-equipment.service';
import { SportType } from './type/sport.type';
import { SportDto } from './../dto/sport.dto';
import { Controller, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from './../base/BaseController';
import { SportEquipment } from './../entity/SportEquipment.entity';

@ApiTags('sport-equipment')
@Controller('sport-equipment')
export class SportEquipmentController extends BaseController<SportEquipmentService, SportEquipmentType, SportEquipment> {
  constructor(
    private readonly sportEquipmentService: SportEquipmentService
  ) {
    super(sportEquipmentService);
  }

  @Get()
  async get(@Query() query: SportEquipmentType): Promise<SportEquipment[] | [SportEquipment[], number]> {
    const data = await this.getBase(query);
    return data;
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<SportEquipment> {
    const data = await this.getOneBase(id);
    return data;
  }

  @Post()
  async create(@Body() body: SportEquipmentType) {
    const data = await this.createBase(body);
    return data;
  }

  @Put()
  async put(@Body() body: SportEquipmentType) {
    const data = await this.putBase(body);
    return data;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const data = await this.deleteBase(id);
    return data;
  }
}
