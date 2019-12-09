import { BaseEntity } from './../base/BaseEntity';
import { UserAttribute } from '../interface/attribute.interface';
import { UserRole } from './UserRole.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { EUserStatus } from "./db.type";
import { UserInfo } from "./UserInfo.entity";
import { Role } from "./Role.entity";
import { UserMeta } from './UserMeta.entity';

@Entity()
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
        nullable: false,
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
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @OneToOne(type => UserInfo)
    // @JoinColumn()
    userInfo: UserInfo;

    @OneToOne(type => UserMeta)
    // @JoinColumn()
    userMeta: UserMeta;

    @OneToMany(type => Role, role => role)
    userRoles: UserRole[];

}
