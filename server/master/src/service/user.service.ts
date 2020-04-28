import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { UserInfo } from './../entity/UserInfo.entity';
import { User } from './../entity/User.entity';
import { UserAttribute, UserInfoAttribute } from './../interface/attribute.interface';
import { UserRepository } from './../repository/user.repository';
import { RoleRepository } from './../repository/role.repository';
import { UserProfileDto } from './../dto/user.dto';
import { RoleCode } from './../constants/auth.constants';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository
    ) { }

    async getUserByName(username: any): Promise<User> {
        return this.userRepository.getOneByOptions({ username });
    }

    async getInfoUser(userAttribute: UserAttribute): Promise<User> {
        return this.userRepository.getInfoUser(userAttribute);
    }

    async getUserById(id: number): Promise<UserProfileDto> {
        const user = await this.userRepository.getInfoUser({ id });
        return new UserProfileDto(user);
    }

    async createUserInfo(userInfoAttribute: UserInfoAttribute, user: User): Promise<UserInfo> {
        if (!user) throw new Error('user is undefine');
        const userInfo = new UserInfo();
        userInfo.firstName = userInfoAttribute.firstName;
        userInfo.lastName = userInfoAttribute.lastName;
        userInfo.phone = userInfoAttribute.phone;
        userInfo.email = userInfoAttribute.email;
        userInfo.address = userInfoAttribute.address;
        userInfo.user = user;
        return this.userRepository.manager.save<UserInfo>(userInfo);
    }

    async createUserRole(roles: RoleCode[], user: User) {
        if (!roles || !roles.length || !user) return;
        return Promise.all(
            roles.map(async role => {
                const roleEntity = await this.roleRepository.findOne({ code: role });
                if (!roleEntity) return;
                return this.userRepository.getRepository('user_role').save({ userId: user.id, roleId: roleEntity.id });
            })
        )
    }

    async update(userAttr: UserAttribute, userUpdate: UserAttribute): Promise<UpdateResult> {
        return this.userRepository.update(userAttr, userUpdate);
    }
}
