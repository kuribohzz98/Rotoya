import { SportGround } from './SportGround.entity';
import { SportGroundTimeSlotAttribute } from './../interface/attribute.interface';
import { BaseEntity } from '../base/BaseEntity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Booking } from './Booking.entity';

@Entity({ name: 'sport_ground_time_slot' })
export class SportGroundTimeSlot
  extends BaseEntity<SportGroundTimeSlotAttribute>
  implements SportGroundTimeSlotAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    width: 11,
    nullable: false,
  })
  sportGroundId: number;

  @Column({
    type: 'float',
    precision: 4,
    scale: 2,
    nullable: true,
  })
  startTime: number;

  @Column({
    type: 'float',
    precision: 4,
    scale: 2,
    nullable: true,
  })
  endTime: number;

  @Column({
    type: 'int',
    width: 11,
    nullable: false,
    default: 200000,
  })
  price: number;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(
    type => SportGround,
    sportGround => sportGround.sportGroundTimeSlots,
  )
  @JoinColumn({ name: 'sportGroundId' })
  sportGround: SportGround;

  @OneToMany(
    type => Booking,
    booking => booking.sportGroundTimeSlot,
  )
  bookings: Booking[];
}
