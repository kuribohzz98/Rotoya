import { UserLoginDto } from './../dto/user.dto';
import { EUserStatus } from './../entity/db.type';
import { UserAttribute } from './../interface/attribute.interface';
import { UserService } from './../service/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async login(userLogin: UserLoginDto) {
    try {
      const user = await this.userService.getUserByName(userLogin.username);
      if (!user) {
        throw new Error('User not found');
      }
      if (!this.isPasswordCorrect(user.password, userLogin.password, user.salt, user.iterations)) {
        throw new Error('Incorrect password');
      }
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    catch (e) {
      return e.message;
    }
  }

  async signUp(userCreate: UserAttribute) {
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
    user.status = EUserStatus.ACTIVE;
    return this.userService.userRepository.save(user);
  }

  private hashPassword(password: any) {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = this.randomIterations();
    var hash = this.hashString(password, salt, iterations);
    return {
      salt: salt,
      password: hash,
      iterations: iterations
    };
  }

  private isPasswordCorrect(savedHash: string, password: any, salt: any, iterations: number): boolean {
    return savedHash == this.hashString(password, salt, iterations);
  }

  private hashString(password: any, salt: any, iterations: number) {
    return crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
  }

  private randomIterations(): number {
    const value = Math.floor(Math.random() * 10000);
    return value >= 3000 && value <= 6000 ? value : this.randomIterations();
  }
}
