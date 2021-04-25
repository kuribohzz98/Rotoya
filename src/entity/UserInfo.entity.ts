import { EUserInfoGender } from './db.type';
import { UserInfoAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'user_info' })
export class UserInfo extends BaseEntity<UserInfoAttribute>
  implements UserInfoAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    width: 11,
    unique: true,
    nullable: false,
  })
  userId: number;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'enum',
    enum: EUserInfoGender,
    nullable: true,
    default: EUserInfoGender.Other,
  })
  gender: string;

  @Column({
    type: 'int',
    width: 11,
    nullable: true,
  })
  phone: number;

  @Column({
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(
    type => User,
    user => user.userInfo,
  )
  @JoinColumn({ name: 'userId' })
  user: User;
}
