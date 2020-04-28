import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserProfileDto } from './../dto/user.dto';
import { UserService } from './../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get(':id')
  async get(@Param('id') id: number): Promise<UserProfileDto> {
    const user = await this.userService.getUserById(+id);
    return user;
  }
}
