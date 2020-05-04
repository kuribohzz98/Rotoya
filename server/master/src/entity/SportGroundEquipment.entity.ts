import { SportGroundEquipmentBooking } from './SportGroundEquipmentBooking.entity';
import { Booking } from './Booking.entity';
import { SportEquipment } from './SportEquipment.entity';
import { SportGround } from './SportGround.entity';
import { SportGroundEquipmentAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    OneToMany
} from "typeorm";

@Entity({ name: 'sport_ground_equipment' })
export class SportGroundEquipment extends BaseEntity<SportGroundEquipmentAttribute> implements SportGroundEquipmentAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportEquipmentId: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportGroundId: number;

    @Column({
        type: 'int',
        width: 4,
        nullable: false,
        default: 0
    })
    quantity: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false,
        default: 0
    })
    price: number;

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

    @ManyToOne(type => SportGround, sportGround => sportGround.sportGroundEquipments)
    @JoinColumn({ name: 'sportGroundId' })
    sportGround: SportGround;

    @ManyToOne(type => SportEquipment, sportEquipment => sportEquipment.sportGroundEquipments)
    @JoinColumn({ name: 'sportEquipmentId' })
    sportEquipment: SportEquipment;

    @ManyToMany(type => Booking, booking => booking.sportGroundEquipments)
    @JoinTable({
        name: "sport_ground_equipment_booking",
        joinColumn: {
            name: 'sportGroundEquipmentId',
            referencedColumnName: 'id'
        }
    })
    bookings: Booking[];

    @OneToMany(type => SportGroundEquipmentBooking, sportGroundEquipmentBooking => sportGroundEquipmentBooking.sportGroundEquipment)
    sportGroundEquipmentBookings: SportGroundEquipmentBooking[];
}
