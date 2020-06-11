import { UserCreateDto, UserLoginDto } from './../dto/user.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async signUp(@Body() userCreate: UserCreateDto) {
        const user = await this.authService.signUp(userCreate);
        if (!user) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Account already exists'
            }, 401)
        }
        return {
            message: "success"
        }
    }

    @Post('login')
    async login(@Body() userLogin: UserLoginDto) {
        console.log(userLogin);
        const user = await this.authService.login(userLogin);
        if (!user.access_token) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: user
            }, HttpStatus.UNAUTHORIZED)
        }
        return user;
    }

    @Post('change-password')
    async changePassword(@Body() userLogin: UserLoginDto) {
        const user = await this.authService.changePassword(userLogin);
        if (!user) {
            return { message: 'faild' };
        }
        return { message: 'success' };
    }

    @Post('forget-password')
    async forgetPassword(@Body() body: { email: string }) {
        try {
            await this.authService.forgetPassword(body.email);
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: e.message
            }, HttpStatus.BAD_REQUEST)
        }
        return { message: 'success' };
    }
}
