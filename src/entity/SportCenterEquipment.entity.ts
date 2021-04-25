import { SportCenter } from './SportCenter.entity';
import { SportCenterEquipmentBooking } from './SportCenterEquipmentBooking.entity';
import { Booking } from './Booking.entity';
import { SportEquipment } from './SportEquipment.entity';
import { SportCenterEquipmentAttribute } from '../interface/attribute.interface';
import { BaseEntity } from '../base/BaseEntity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'sport_center_equipment' })
export class SportCenterEquipment
  extends BaseEntity<SportCenterEquipmentAttribute>
  implements SportCenterEquipmentAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    width: 11,
    nullable: false,
  })
  sportEquipmentId: number;

  @Column({
    type: 'int',
    width: 11,
    nullable: false,
  })
  sportCenterId: number;

  @Column({
    type: 'int',
    width: 4,
    nullable: false,
    default: 0,
  })
  quantity: number;

  @Column({
    type: 'int',
    width: 11,
    nullable: false,
    default: 0,
  })
  price: number;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  isDelete: boolean;

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
    type => SportCenter,
    sportCenter => sportCenter.sportCenterEquipments,
  )
  @JoinColumn({ name: 'sportCenterId' })
  sportCenter: SportCenter;

  @ManyToOne(
    type => SportEquipment,
    sportEquipment => sportEquipment.sportCenterEquipments,
    { eager: true },
  )
  @JoinColumn({ name: 'sportEquipmentId' })
  sportEquipment: SportEquipment;

  @ManyToMany(
    type => Booking,
    booking => booking.sportCenterEquipments,
  )
  @JoinTable({
    name: 'sport_center_equipment_booking',
    joinColumn: {
      name: 'sportCenterEquipmentId',
      referencedColumnName: 'id',
    },
  })
  bookings: Booking[];

  @OneToMany(
    type => SportCenterEquipmentBooking,
    sportCenterEquipmentBooking =>
      sportCenterEquipmentBooking.sportCenterEquipment,
  )
  sportCenterEquipmentBookings: SportCenterEquipmentBooking[];
}
