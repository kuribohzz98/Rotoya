import { UserService } from './../service/user.service';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  // async signUp(@Body() userAttribute: UserAttribute) {
  //   const user = await this.userService.signUp(userAttribute);
  //   if (!user) {
  //       throw new HttpException({
  //           status: HttpStatus.UNAUTHORIZED,
  //           error: 'Account already exists'
  //       }, 401)
  //   }
  //   return {
  //       "message": "success"
  //   }
  // }
}
