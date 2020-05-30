import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './../base/BaseEntity';
import { RequestCoOperateAttribute } from './../interface/attribute.interface';
import { ECoOperateStatus } from './db.type';

@Entity({ name: 'request_co_operate' })
export class RequestCoOperate extends BaseEntity<RequestCoOperateAttribute> implements RequestCoOperateAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ECoOperateStatus,
        default: ECoOperateStatus.WAITTING,
        nullable: false
    })
    status: ECoOperateStatus;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: '15',
        nullable: false
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    city: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    district: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    commune: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: true
    })
    address: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    note: string;

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
}