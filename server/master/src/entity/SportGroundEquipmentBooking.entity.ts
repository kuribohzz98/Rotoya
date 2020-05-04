import { Booking } from './Booking.entity';
import { SportGroundEquipment } from './SportGroundEquipment.entity';
import { SportGroundEquipmentBookingAttribute } from '../interface/attribute.interface';
import { BaseEntity } from '../base/BaseEntity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SportEquipment } from './SportEquipment.entity';

@Entity('sport_ground_equipment_booking')
export class SportGroundEquipmentBooking extends BaseEntity<SportGroundEquipmentBookingAttribute> implements SportGroundEquipmentBookingAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportGroundEquipmentId: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    bookingId: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    price: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    amount: number;

    @ManyToOne(type => SportGroundEquipment, sportGroundEquipment => sportGroundEquipment.sportGroundEquipmentBookings)
    @JoinColumn({name: 'sportGroundEquipmentId'})
    sportGroundEquipment: SportGroundEquipment;

    @ManyToOne(type => Booking, booking => booking.sportGroundEquipmentBookings)
    @JoinColumn({name: 'bookingId'})
    booking: Booking;
}