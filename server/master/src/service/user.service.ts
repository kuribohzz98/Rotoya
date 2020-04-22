import { Injectable } from '@nestjs/common';
import { User } from './../entity/User.entity';
import { UserAttribute } from './../interface/attribute.interface';
import { UserRepository } from './../repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository
    ) { }

    async getUserByName(username: any): Promise<User> {
        return this.userRepository.getOneByOptions({ username });
    }

    async getInfoUser(userAttribute: UserAttribute): Promise<User> {
        return this.userRepository.getInfoUser(userAttribute);
    }
}
