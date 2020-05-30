import { SportCenterEquipment } from './SportCenterEquipment.entity';
import { SportCenterEquipmentBooking } from './SportCenterEquipmentBooking.entity';
import { SportGroundTimeSlot } from './SportGroundTimeSlot.entity';
import { BookingAttribute } from './../interface/attribute.interface';
import { BaseEntity } from '../base/BaseEntity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Payment } from './Payment.entity';

@Entity({ name: 'booking' })
export class Booking extends BaseEntity<BookingAttribute> implements BookingAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    timeSlotId: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: true
    })
    paymentId: number;

    @Column({
        type: 'date',
        nullable: true
    })
    bookingDate: string;

    @Column({
        type: 'int',
        width: 11,
        nullable: true
    })
    amount: number;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ManyToOne(type => Payment, payment => payment.bookings)
    @JoinColumn({name: "paymentId"})
    payment: Payment;

    @ManyToOne(type => SportGroundTimeSlot, sportGroundTimeSlot => sportGroundTimeSlot.bookings)
    @JoinColumn({ name: "timeSlotId" })
    sportGroundTimeSlot: SportGroundTimeSlot;

    @OneToMany(type => SportCenterEquipmentBooking, sportCenterEquipmentBooking => sportCenterEquipmentBooking.booking)
    sportCenterEquipmentBookings: SportCenterEquipmentBooking[];

    @ManyToMany(type => SportCenterEquipment, sportCenterEquipment => sportCenterEquipment.bookings)
    @JoinTable({
        name: "sport_center_equipment_booking",
        joinColumn: {
            name: 'bookingId',
            referencedColumnName: 'id'
        }
    })
    sportCenterEquipments: SportCenterEquipment[];
}
