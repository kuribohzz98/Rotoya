import { EmailService } from './../service/email.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserLoginDto, UserProfileDto, UserCreateDto } from './../dto/user.dto';
import { EUserStatus } from './../entity/db.type';
import { UserAttribute } from './../interface/attribute.interface';
import { UserService } from './../service/user.service';
import { User } from './../entity/User.entity';
import { RandomPassword } from './../helper/utils/common';

type PasswordData = {
  salt: string;
  password: string;
  iterations: number;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  async login(userLogin: UserLoginDto) {
    try {
      const user = await this.userService.getInfoUser({
        username: userLogin.username,
      });
      console.log(user);
      if (!user) {
        throw new Error('User not found');
      }
      if (
        !this.isPasswordCorrect(
          user.password,
          userLogin.password,
          user.salt,
          user.iterations,
        )
      ) {
        throw new Error('Incorrect password');
      }
      const payload = { username: user.username, sub: user.id };
      const userProfile = new UserProfileDto(user);
      return {
        access_token: this.jwtService.sign(payload),
        user: userProfile,
      };
    } catch (e) {
      return e.message;
    }
  }

  async signUp(userCreate: UserCreateDto): Promise<UserAttribute & User> {
    const userInvaild = await this.userService.getUserByName(
      userCreate.username,
    );
    if (userInvaild) {
      return;
    }
    const hashPassword = this.hashPassword(userCreate.password);
    let user = {} as UserAttribute;
    user.username = userCreate.username;
    user.password = hashPassword.password;
    user.salt = hashPassword.salt;
    user.iterations = hashPassword.iterations;
    user.type = '1';
    user.isNew = true;
    user.status = EUserStatus.ACTIVE;
    const userEntity = await this.userService.userRepository.save(user);
    if (userCreate.userInfo) {
      await this.userService.createUserInfo(userCreate.userInfo, userEntity);
    }
    if (userCreate.roles && userCreate.roles.length) {
      await this.userService.createUserRole(userCreate.roles, userEntity);
    }
    return userEntity;
  }

  async changePassword(data: UserLoginDto): Promise<boolean> {
    const hashPassword = this.hashPassword(data.password);
    try {
      await this.userService.updateByAttribute(
        { username: data.username },
        { ...hashPassword, isNew: null },
      );
    } catch (e) {
      return false;
    }
    return true;
  }

  async forgetPassword(email: string) {
    if (!email) throw new Error('email is undefine');
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new Error('Email chưa được đăng ký');
    const new_password = RandomPassword();
    const new_password_hash = this.hashPassword(new_password);
    const update = await this.userService.update(user.id, {
      ...new_password_hash,
      isNew: true,
    });
    if (update) {
      await this.emailService.sendMail(
        [user.userInfo.email],
        'Rotoya Cấp lại mật khẩu',
        `Mật khẩu mới của bạn là:\n
        Tên đăng nhập: ${user.username}\n
        Mật Khẩu: ${new_password}\n
        Vui lòng đăng nhập và đổi lại mật khẩu mới.`,
      );
    }
    return true;
  }

  private hashPassword(password: any): PasswordData {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = this.randomIterations();
    var hash = this.hashString(password, salt, iterations);
    return { salt, password: hash, iterations };
  }

  private isPasswordCorrect(
    savedHash: string,
    password: any,
    salt: any,
    iterations: number,
  ): boolean {
    return savedHash == this.hashString(password, salt, iterations);
  }

  private hashString(password: any, salt: any, iterations: number): string {
    return crypto
      .pbkdf2Sync(password, salt, iterations, 64, 'sha512')
      .toString('hex');
  }

  private randomIterations(): number {
    const value = Math.floor(Math.random() * 10000);
    return value >= 3000 && value <= 6000 ? value : this.randomIterations();
  }
}
