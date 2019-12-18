import { UserAttribute } from './../interface/attribute.interface';
import { UserRepository } from './../repository/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository
    ) { }

    async getUserByName(username: any) {
        return this.userRepository.getOneByOptions({ username });
    }

    async getInfoUser(userAttribute: UserAttribute) {
        return this.userRepository.getInfoUser(userAttribute);
    }
}
