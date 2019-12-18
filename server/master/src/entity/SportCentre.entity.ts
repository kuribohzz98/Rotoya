import { SportEquipment } from './SportEquipment.entity';
import { SportGround } from './SportGround.entity';
import { User } from './User.entity';
import { SportCentreAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, PrimaryColumn } from "typeorm";

@Entity()
export class SportCentre extends BaseEntity<SportCentreAttribute> implements SportCentreAttribute {
    @PrimaryGeneratedColumn()
    id?: number;

    @PrimaryColumn({
        type: 'int',
        width: 11,
        nullable: false
    })
    userId?: number;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    name?: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: true
    })
    code?: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    country?: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    city?: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    district?: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: true
    })
    commune?: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: true
    })
    address?: string;

    @Column({
        type: 'float',
        precision: 12,
        scale: 8,
        nullable: true
    })
    latitude?: number;

    @Column({
        type: 'float',
        precision: 12,
        scale: 8,
        nullable: true
    })
    longitude?: number;

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

    @ManyToOne(type => User, user => user.sportCentres)
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(type => SportGround, sportGround => sportGround.sportCentre)
    sportGrounds: SportGround[];

    @OneToMany(type => SportEquipment, sportEquipment => sportEquipment.sportCentre)
    sportEquipments: SportEquipment[];

}
