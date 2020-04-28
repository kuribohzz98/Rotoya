import { Payment } from './Payment.entity';
import { SportCenter } from './SportCenter.entity';
import { BaseEntity } from './../base/BaseEntity';
import { UserAttribute } from '../interface/attribute.interface';
import { UserRole } from './UserRole.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinTable,
    ManyToMany
} from "typeorm";
import { EUserStatus } from "./db.type";
import { UserInfo } from "./UserInfo.entity";
import { Role } from "./Role.entity";
import { UserMeta } from './UserMeta.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity<UserAttribute> implements UserAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: false
    })
    password: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: true
    })
    type: string;

    @Column({
        type: 'enum',
        enum: EUserStatus,
        nullable: true,
        default: EUserStatus.ACTIVE
    })
    status: EUserStatus;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: true
    })
    salt: string;

    @Column({
        type: 'int',
        width: 11,
        nullable: true
    })
    iterations: number;

    @Column({
        type: 'boolean',
        nullable: true
    })
    isNew: boolean;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @OneToOne(type => UserInfo, userInfo => userInfo.user)
    userInfo: UserInfo;

    @OneToOne(type => UserMeta, userMeta => userMeta.user)
    userMeta: UserMeta;

    @ManyToMany(type => Role, role => role.users)
    @JoinTable({
        name: "user_role",
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        }
        // inverseJoinColumn: {
        //     name: "user",
        //     referencedColumnName: "id"
        // }
    })
    roles: Role[];

    @OneToMany(type => UserRole, userRole => userRole.user)
    userRoles: UserRole[];

    @OneToMany(type => SportCenter, sportCenter => sportCenter.user)
    sportCenters: SportCenter[];

    @OneToMany(type => Payment, payment => payment.user)
    payments: Payment[];
}
