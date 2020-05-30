import { SportType } from './type/sport.type';
import { SportDto } from './../dto/sport.dto';
import { Controller, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from './../base/BaseController';
import { SportService } from './../service/sport.service';

@ApiTags('sport')
@Controller('sport')
export class SportController extends BaseController<SportService, SportType, SportDto> {
  constructor(
    private readonly sportService: SportService
  ) {
    super(sportService);
  }

  @Get()
  async get(@Query() query: SportType): Promise<SportDto[] | [SportDto[], number]> {
    const data = await this.getBase(query);
    return data;
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<SportDto> {
    const data = await this.getOneBase(id);
    return data;
  }

  @Post()
  async create(@Body() body: SportType) {
    const data = await this.createBase(body);
    return data;
  }

  @Put()
  async put(@Body() body: SportType) {
    const data = await this.putBase(body);
    return data;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const data = await this.deleteBase(id);
    return data;
  }
}
