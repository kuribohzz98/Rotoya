import { UserMetaAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'user_meta' })
export class UserMeta extends BaseEntity<UserMetaAttribute>
  implements UserMetaAttribute {
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
    length: '255',
    nullable: true,
  })
  avatar: string;

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
    user => user.userMeta,
  )
  @JoinColumn({ name: 'userId' })
  user: User;
}
