import { SportGroundTimeSlot } from './SportGroundTimeSlot.entity';
import { SportEquipment } from './SportEquipment.entity';
import { SportCenter } from './SportCenter.entity';
import { Sport } from './Sport.entity';
import { SportGroundAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    OneToMany
} from "typeorm";
import { SportGroundEquipment } from './SportGroundEquipment.entity';

@Entity({ name: 'sport_ground' })
export class SportGround extends BaseEntity<SportGroundAttribute> implements SportGroundAttribute {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportCenterId?: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportId?: number;

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
        nullable: true
    })
    type?: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: true
    })
    avatar?: string;

    @Column({
        type: 'int',
        width: 4,
        nullable: false,
        default: 0
    })
    quantity?: number;

    @Column({
        type: 'int',
        width: 4,
        nullable: false,
        default: 0
    })
    quantityInStock?: number;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: true
    })
    description?: string;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt?: Date;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt?: Date;

    @OneToOne(type => Sport, sport => sport.sportGround)
    sport: Sport;

    @ManyToOne(type => SportCenter, sportCenter => sportCenter.sportGrounds)
    @JoinColumn({ name: 'sportCenterId' })
    sportCenter: SportCenter;

    @ManyToMany(type => SportEquipment, sportEquipment => sportEquipment.sportGrounds)
    @JoinTable({
        name: "sport_ground_equipment",
        joinColumn: {
            name: "sportGroundId",
            referencedColumnName: "id"
        },
        // inverseJoinColumn: {
        //     name: "sportEquipment",
        //     referencedColumnName: "id"
        // }
    })
    sportEquipments: SportEquipment[];

    @OneToMany(type => SportGroundEquipment, sportGroundEquipment => sportGroundEquipment.sportGround)
    sportGroundEquipments: SportGroundEquipment[];

    @OneToMany(type => SportGroundTimeSlot, sportGroundTimeSlot => sportGroundTimeSlot.sportGround)
    sportGroundTimeSlots: SportGroundTimeSlot[];

}
