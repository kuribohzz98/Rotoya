import { Booking } from './Booking.entity';
import { SportCenterEquipment } from './SportCenterEquipment.entity';
import { SportCenterEquipmentBookingAttribute } from '../interface/attribute.interface';
import { BaseEntity } from '../base/BaseEntity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('sport_center_equipment_booking')
export class SportCenterEquipmentBooking extends BaseEntity<SportCenterEquipmentBookingAttribute> implements SportCenterEquipmentBookingAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportCenterEquipmentId: number;

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

    @ManyToOne(type => SportCenterEquipment, sportCenterEquipment => sportCenterEquipment.sportCenterEquipmentBookings)
    @JoinColumn({name: 'sportCenterEquipmentId'})
    sportCenterEquipment: SportCenterEquipment;

    @ManyToOne(type => Booking, booking => booking.sportCenterEquipmentBookings)
    @JoinColumn({name: 'bookingId'})
    booking: Booking;
}