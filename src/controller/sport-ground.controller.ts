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
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { SportGroundDto } from './../dto/sport-ground.dto';
import { SportGroundType } from './type/sport-ground.type';
import { SportGroundService } from './../service/sport-ground.service';
import { BaseController } from './../base/BaseController';

@ApiTags('Sport Ground')
@Controller('sport-ground')
export class SportGroundController extends BaseController<
  SportGroundService,
  SportGroundType,
  SportGroundDto
> {
  constructor(private readonly sportGroundService: SportGroundService) {
    super(sportGroundService);
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

  @Get('info/:id')
  @ApiQuery({
    name: 'time',
    description: new Date().getTime().toString(),
    required: false,
  })
  async getInfo(@Param('id') id: number, @Query() query: { time: number }) {
    const result = await this.sportGroundService.getSportGround({
      id,
      time: +query.time,
    });
    return result;
  }
}
