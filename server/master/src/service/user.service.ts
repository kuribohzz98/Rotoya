import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { UserInfo } from './../entity/UserInfo.entity';
import { User } from './../entity/User.entity';
import { UserAttribute, UserInfoAttribute } from './../interface/attribute.interface';
import { UserRepository } from './../repository/user.repository';
import { RoleRepository } from './../repository/role.repository';
import { UserProfileDto } from './../dto/user.dto';
import { RoleCode } from './../constants/auth.constants';
import { OptionsPaging } from './../interface/repository.interface';
import { BaseService } from '../base/BaseService';

@Injectable()
export class UserService extends BaseService<UserRepository, User, UserAttribute, UserProfileDto>{
    constructor(
        public readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository
    ) {
        super(userRepository)
    }

    mapEntityToDto(entity: User): UserProfileDto {
        return new UserProfileDto(entity);
    }

    async getUserByName(username: any): Promise<User> {
        return this.userRepository.getOneByOptions({ username });
    }

    async getInfoUser(userAttribute: UserAttribute): Promise<User> {
        return this.userRepository.getInfoUser(userAttribute);
    }

    async getById(id: number): Promise<UserProfileDto> {
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

    async updateByAttribute(userAttr: UserAttribute, userUpdate: UserAttribute): Promise<UpdateResult> {
        return this.userRepository.update(userAttr, userUpdate);
    }

    async get(
        opts?: UserAttribute,
        page?: OptionsPaging
    ): Promise<UserProfileDto[] | [UserProfileDto[], number]> {
        const data = await this.userRepository.get(opts, page, ['userInfo', 'userMeta', 'roles']);
        return this.mapEntitiesToDtos(data, page.count);
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.getUserByEmail(email);
    }
}
