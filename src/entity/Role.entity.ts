import { RoleAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { UserRole } from './UserRole.entity';
import { User } from './User.entity';

@Entity({ name: 'role' })
export class Role extends BaseEntity<RoleAttribute> implements RoleAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
  })
  code: string;

  @ManyToMany(
    type => User,
    user => user.roles,
  )
  users: User[];

  @OneToMany(
    type => UserRole,
    userRole => userRole.role,
  )
  userRoles: UserRole[];
}
