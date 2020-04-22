import { Controller, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SportGroundDto } from './../dto/sport-ground.dto';
import { SportGroundType } from './type/sport-ground.type';
import { SportGround } from './../entity/SportGround.entity';
import { SportGroundRepository } from './../repository/sport-ground.repository';
import { SportGroundService } from './../service/sport-ground.service';
import { SportType } from './type/sport.type';
import { SportGroundAttribute } from './../interface/attribute.interface';
import { BaseController } from './../base/BaseController';
import { SportService } from './../service/sport.service';

@ApiTags('Sport Ground')
@Controller('sport-ground')
export class SportGroundController extends
  BaseController<SportGroundService, SportGroundRepository, SportGround, SportGroundAttribute, SportGroundType, SportGroundDto> {
  constructor(
    private readonly sportService: SportGroundService
  ) {
    super(sportService);
  }

  @Get()
  async get(@Query() query: SportGroundType) {
    const data = await this.getBase(query);
    return data;
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.getOneBase(id);
    return data;
  }

  @Post()
  async create(@Body() body: SportGroundType) {
    const data = await this.createBase(body);
    return data;
  }

  @Put()
  async put(@Body() body: SportGroundType) {
    const data = await this.putBase(body);
    return data;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const data = await this.deleteBase(id);
    return data;
  }
}
