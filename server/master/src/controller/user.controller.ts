import { UserAttribute } from './../interface/attribute.interface';
import { UserService } from './../service/user.service';
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  // @Post('/auth/signUp')
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
