import { SportCenterEquipment } from './SportCenterEquipment.entity';
import { SportEquipment } from './SportEquipment.entity';
import { SportCenterFavorite } from './SportCenterFavorite.entity';
import { Payment } from './Payment.entity';
import { SportGround } from './SportGround.entity';
import { User } from './User.entity';
import { SportCenterAttribute } from '../interface/attribute.interface';
import { BaseEntity } from '../base/BaseEntity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Sport } from './Sport.entity';
import { SportCenterSport } from './SportCenterSport.entity';

@Entity({ name: 'sport_center' })
export class SportCenter extends BaseEntity<SportCenterAttribute>
  implements SportCenterAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    width: 11,
    nullable: false,
  })
  userId: number;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: true,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
  })
  district: string;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: true,
  })
  commune: string;

  @Column({
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'float',
    precision: 12,
    scale: 8,
    nullable: true,
  })
  latitude: number;

  @Column({
    type: 'float',
    precision: 12,
    scale: 8,
    nullable: true,
  })
  longitude: number;

  @Column({
    type: 'float',
    precision: 4,
    scale: 2,
    nullable: false,
    default: "'0.00'",
  })
  timeOpen: number;

  @Column({
    type: 'float',
    precision: 4,
    scale: 2,
    nullable: false,
    default: "'0.00'",
  })
  timeClose: number;

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

  @ManyToOne(
    type => User,
    user => user.sportCenters,
  )
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(
    type => SportGround,
    sportGround => sportGround.sportCenter,
  )
  sportGrounds: SportGround[];

  @ManyToMany(
    type => Sport,
    sport => sport.sportCenters,
  )
  @JoinTable({
    name: 'sport_sportcenter',
    joinColumn: {
      name: 'sportCenterId',
      referencedColumnName: 'id',
    },
  })
  sports: Sport[];

  @OneToMany(
    type => SportCenterSport,
    sportCenterSport => sportCenterSport.sportCenter,
  )
  sportCenterSports: SportCenterSport[];

  @OneToMany(
    type => Payment,
    payment => payment.sportCenter,
  )
  payments: Payment[];

  @OneToMany(
    type => SportCenterFavorite,
    sportCenterFavorite => sportCenterFavorite.sportCenter,
  )
  sportCenterFavorites: SportCenterFavorite[];

  @ManyToMany(
    type => SportEquipment,
    sportEquipment => sportEquipment.sportCenters,
  )
  @JoinTable({
    name: 'sport_center_equipment',
    joinColumn: {
      name: 'sportCenterId',
      referencedColumnName: 'id',
    },
    // inverseJoinColumn: {
    //     name: "sportEquipment",
    //     referencedColumnName: "id"
    // }
  })
  sportEquipments: SportEquipment[];

  @OneToMany(
    type => SportCenterEquipment,
    sportCenterEquipment => sportCenterEquipment.sportCenter,
  )
  sportCenterEquipments: SportCenterEquipment[];
}
