import { PaymentAttribute } from './../interface/attribute.interface';
import { BaseEntity } from '../base/BaseEntity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    PrimaryColumn,
    OneToOne
} from "typeorm";
import { Booking } from './Booking.entity';

@Entity({ name: 'payment' })
export class Payment extends BaseEntity<PaymentAttribute> implements PaymentAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({
        type: 'int',
        width: 11,
        nullable: false
    })
    bookingId?: number;

    @Column({
        type: 'float',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 0
    })
    amount?: number;

    @Column({
        type: 'varchar',
        length: '15',
        nullable: false,
        default: "'VND'"
    })
    currency?: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: true
    })
    qrCode?: string;

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

    @OneToOne(type => Booking, booking => booking.payment)
    @JoinColumn({ name: "bookingId" })
    booking: Booking;
}
