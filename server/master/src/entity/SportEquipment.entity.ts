import { Sport } from './Sport.entity';
import { SportGround } from './SportGround.entity';
import { SportEquipmentAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    OneToMany
} from "typeorm";
import { SportGroundEquipment } from './SportGroundEquipment.entity';

@Entity({ name: 'sport_equipment' })
export class SportEquipment extends BaseEntity<SportEquipmentAttribute> implements SportEquipmentAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportId: number;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: true
    })
    name: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: true
    })
    description: string;

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

    @ManyToOne(type => Sport, sport => sport.sportEquipments)
    sport: Sport;

    @ManyToMany(type => SportGround, sportGround => sportGround.sportEquipments)
    sportGrounds: SportGround[];

    @OneToMany(type => SportGroundEquipment, sportGroundEquipment => sportGroundEquipment.sportEquipment)
    sportGroundEquipments: SportGroundEquipment[];
}
