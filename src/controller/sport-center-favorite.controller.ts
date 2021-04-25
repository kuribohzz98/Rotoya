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
import { SportCenterFavorite } from './../entity/SportCenterFavorite.entity';
import { SportCenterFavoriteType } from './type/sport-center-favorite.type';
import { SportCenterFavoriteService } from './../service/sport-center-favorite.service';
import { BaseController } from './../base/BaseController';

@ApiTags('sport-center-favorite')
@Controller('sport-center-favorite')
export class SportCenterFavoriteController extends BaseController<
  SportCenterFavoriteService,
  SportCenterFavoriteType
> {
  constructor(
    private readonly sportCenterFavoriteService: SportCenterFavoriteService,
  ) {
    super(sportCenterFavoriteService);
  }

  @Get()
  async get(
    @Query() query: SportCenterFavoriteType,
  ): Promise<SportCenterFavorite[] | [SportCenterFavorite[], number]> {
    const data = await this.getBase(query);
    return data;
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<SportCenterFavorite> {
    const data = await this.getOneBase(id);
    return data;
  }

  @Post()
  async create(@Body() body: SportCenterFavoriteType) {
    const data = await this.createBase(body);
    return data;
  }

  @Put()
  async put(@Body() body: SportCenterFavoriteType) {
    const data = await this.putBase(body);
    return data;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const data = await this.deleteBase(id);
    return data;
  }
}
