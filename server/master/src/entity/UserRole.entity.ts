import { UserRoleAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import { Role } from './Role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from './User.entity';

@Entity()
export class UserRole extends BaseEntity<UserRoleAttribute> implements UserRoleAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    userId: number;

    @Column({
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
    role: Role;

    @ManyToOne(type => User, user => user.userRoles)
    user: User;
}
