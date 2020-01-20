import { UserRoleAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import { Role } from './Role.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryColumn
} from "typeorm";
import { User } from './User.entity';

@Entity({ name: 'user_role' })
export class UserRole extends BaseEntity<UserRoleAttribute> implements UserRoleAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({
        type: 'int',
        width: 11,
        nullable: false
    })
    userId: number;

    @PrimaryColumn({
        type: 'int',
        width: 11,
        nullable: false
    })
    roleId: number;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @ManyToOne(type => Role, role => role.userRoles)
    @JoinColumn({ name: "roleId" })
    role: Role;

    @ManyToOne(type => User, user => user.userRoles)
    @JoinColumn({ name: "userId" })
    user: User;
}
