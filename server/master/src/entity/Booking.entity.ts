import { SportGroundTimeSlot } from './SportGroundTimeSlot.entity';
import { SportCenter } from './SportCenter.entity';
import { User } from './User.entity';
import { SportGround } from './SportGround.entity';
import { BookingAttribute } from './../interface/attribute.interface';
import { BaseEntity } from '../base/BaseEntity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
    OneToOne
} from "typeorm";
import { Payment } from './Payment.entity';

@Entity({ name: 'booking' })
export class Booking extends BaseEntity<BookingAttribute> implements BookingAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({
        type: 'int',
        width: 11,
        nullable: false
    })
    userId?: number;

    @PrimaryColumn({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportGroundId?: number;

    @PrimaryColumn({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportCenterId?: number;

    @PrimaryColumn({
        type: 'int',
        width: 11,
        nullable: false
    })
    timeSlotId?: number;

    @Column({
        type: 'date',
        nullable: true
    })
    bookingDate?: Date;

    @Column({
        type: 'json',
        nullable: true
    })
    detail?: string;

    @Column({
        type: 'json',
        nullable: true
    })
    equipment?: string;

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

    @ManyToOne(type => User, user => user.bookings)
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(type => SportGround, sportGround => sportGround.bookings)
    @JoinColumn({ name: "sportGroundId" })
    sportGround: SportGround;

    @ManyToOne(type => SportCenter, sportCenter => sportCenter.bookings)
    @JoinColumn({ name: "sportCenterId" })
    sportCenter: SportCenter;

    @OneToOne(type => Payment, payment => payment.booking)
    payment: Payment;

    @ManyToOne(type => SportGroundTimeSlot, sportGroundTimeSlot => sportGroundTimeSlot.bookings)
    sportGroundTimeSlot: SportGroundTimeSlot;
}
