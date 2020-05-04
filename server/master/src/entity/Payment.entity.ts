import { SportCenter } from './SportCenter.entity';
import { User } from './User.entity';
import { PaymentAttribute } from './../interface/attribute.interface';
import { BaseEntity } from '../base/BaseEntity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Booking } from './Booking.entity';

@Entity({ name: 'payment' })
export class Payment extends BaseEntity<PaymentAttribute> implements PaymentAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    userId: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportCenterId: number;

    @Column({
        type: 'float',
        precision: 12,
        scale: 2,
        nullable: false,
        default: 0
    })
    amount: number;

    @Column({
        type: 'varchar',
        length: '15',
        nullable: false,
        default: "'VND'"
    })
    currency: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: true
    })
    orderId: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: true
    })
    transactionId: string;

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

    @OneToMany(type => Booking, booking => booking.payment)
    bookings: Booking[];

    @ManyToOne(type => User, user => user.payments)
    @JoinColumn({name: 'userId'})
    user: User;

    @ManyToOne(type => SportCenter, sportCenter => sportCenter.payments)
    @JoinColumn({name: 'sportCenterId'})
    sportCenter: SportCenter;
}
