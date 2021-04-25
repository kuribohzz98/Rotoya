import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserType } from './type/user.type';
import { UserProfileDto } from './../dto/user.dto';
import { UserService } from './../service/user.service';
import { BaseController } from './../base/BaseController';

@ApiTags('User')
@Controller('user')
export class UserController extends BaseController<
  UserService,
  UserType,
  UserProfileDto
> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  // @Get(':id')
  // async get(@Param('id') id: number): Promise<UserProfileDto> {
  //   const user = await this.userService.getUserById(+id);
  //   return user;
  // }

  @Get()
  async get(
    @Query() query: UserType,
  ): Promise<UserProfileDto[] | [UserProfileDto[], number]> {
    const data = await this.getBase(query);
    return data;
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<UserProfileDto> {
    const data = await this.getOneBase(id);
    return data;
  }

  @Post()
  async create(@Body() body: UserType) {
    const data = await this.createBase(body);
    return data;
  }

  @Put()
  async put(@Body() body: UserType) {
    const data = await this.putBase(body);
    return data;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const data = await this.deleteBase(id);
    return data;
  }
}
