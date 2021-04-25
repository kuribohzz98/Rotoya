import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SportCenterEquipmentDto } from './../dto/sport-center-equipment.dto';
import { SportCenterEquipmentType } from './type/sport-center-equipment.type';
import { SportCenterEquipmentService } from './../service/sport-center-equipment.service';
import { BaseController } from './../base/BaseController';

@ApiTags('sport-center-equipment')
@Controller('sport-center-equipment')
export class SportCenterEquipmentController extends BaseController<
  SportCenterEquipmentService,
  SportCenterEquipmentType,
  SportCenterEquipmentDto
> {
  constructor(
    private readonly sportCenterEquipmentService: SportCenterEquipmentService,
  ) {
    super(sportCenterEquipmentService);
  }

  @Get()
  async get(
    @Query() query: SportCenterEquipmentType,
  ): Promise<SportCenterEquipmentDto[] | [SportCenterEquipmentDto[], number]> {
    const data = await this.getBase(query);
    return data;
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<SportCenterEquipmentDto> {
    const data = await this.getOneBase(id);
    return data;
  }

  @Post()
  async create(@Body() body: SportCenterEquipmentType) {
    const data = await this.createBase(body);
    return data;
  }

  @Put()
  async put(@Body() body: SportCenterEquipmentType) {
    const data = await this.putBase(body);
    return data;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const data = await this.deleteBase(id);
    return data;
  }
}
