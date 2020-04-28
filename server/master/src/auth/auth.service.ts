import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserLoginDto, UserProfileDto, UserCreateDto } from './../dto/user.dto';
import { EUserStatus } from './../entity/db.type';
import { UserAttribute } from './../interface/attribute.interface';
import { UserService } from './../service/user.service';
import { User } from './../entity/User.entity';

type PasswordData = {
  salt: string,
  password: string,
  iterations: number
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }

  async login(userLogin: UserLoginDto) {
    try {
      const user = await this.userService.getInfoUser({ username: userLogin.username });
      console.log(user);
      if (!user) {
        throw new Error('User not found');
      }
      if (!this.isPasswordCorrect(user.password, userLogin.password, user.salt, user.iterations)) {
        throw new Error('Incorrect password');
      }
      const payload = { username: user.username, sub: user.id };
      const userProfile = new UserProfileDto(user);
      return {
        access_token: this.jwtService.sign(payload),
        user: userProfile
      };
    }
    catch (e) {
      return e.message;
    }
  }

  async signUp(userCreate: UserCreateDto): Promise<UserAttribute & User> {
    const userInvaild = await this.userService.getUserByName(userCreate.username);
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
      await this.userService.update({ username: data.username }, { ...hashPassword, isNew: null });
    } catch (e) {
      return false;
    }
    return true;
  }

  private hashPassword(password: any): PasswordData {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = this.randomIterations();
    var hash = this.hashString(password, salt, iterations);
    return { salt, password: hash, iterations };
  }

  private isPasswordCorrect(savedHash: string, password: any, salt: any, iterations: number): boolean {
    return savedHash == this.hashString(password, salt, iterations);
  }

  private hashString(password: any, salt: any, iterations: number): string {
    return crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
  }

  private randomIterations(): number {
    const value = Math.floor(Math.random() * 10000);
    return value >= 3000 && value <= 6000 ? value : this.randomIterations();
  }
}
