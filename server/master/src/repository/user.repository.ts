import { UserAttribute } from './../interface/attribute.interface';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from "typeorm";
import { User } from "../entity/User.entity";

@EntityRepository(User)
export class UserRepository extends BaseRepository<User, UserAttribute>  {
    getInfoUser(whereOptions: UserAttribute) {
        return this.findOne({
            where: whereOptions,
            join: {
                alias: this.models.user,
                leftJoinAndSelect: {
                    userInfo: `${this.models.user}.userInfo`,
                    userMeta: `${this.models.user}.userMeta`,
                    roles: `${this.models.user}.roles`
                },
            }
        })
    }

}