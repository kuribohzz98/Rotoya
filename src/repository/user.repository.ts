import { UserAttribute } from './../interface/attribute.interface';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from 'typeorm';
import { User } from '../entity/User.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User, UserAttribute> {
  getInfoUser(whereOptions: UserAttribute): Promise<User> {
    return this.getOneByOptions(whereOptions, [
      'userInfo',
      'userMeta',
      'roles',
    ]);
  }

  getUserByEmail(email: string): Promise<User> {
    const user = this.models.user;
    const user_info = this.models.user_info;
    return this.createQueryBuilder(user)
      .leftJoinAndMapOne(
        `${user}.userInfo`,
        user_info,
        user_info,
        `${user}.id = ${user_info}.userId`,
      )
      .where(`${user_info}.email = :email`, { email })
      .getOne();
  }
}
