import { SportCenter } from './SportCenter.entity';
import { Sport } from './Sport.entity';
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
import { SportCenterEquipment } from './SportCenterEquipment.entity';

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
    image: string;

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

    @ManyToMany(type => SportCenter, sportCenter => sportCenter.sportEquipments)
    sportCenters: SportCenter[];

    @OneToMany(type => SportCenterEquipment, sportCenterEquipment => sportCenterEquipment.sportEquipment)
    sportCenterEquipments: SportCenterEquipment[];
}
