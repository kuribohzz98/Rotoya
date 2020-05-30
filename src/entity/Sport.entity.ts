import { SportEquipment } from './SportEquipment.entity';
import { SportCenterSport } from './SportCenterSport.entity';
import { SportAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToMany,
    OneToMany
} from "typeorm";
import { SportGround } from './SportGround.entity';
import { SportCenter } from './SportCenter.entity';

@Entity({ name: 'sport' })
export class Sport extends BaseEntity<SportAttribute> implements SportAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        unique: true,
        length: '45',
        nullable: true
    })
    code: string;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt?: Date;

    @OneToOne(type => SportGround, sportGround => sportGround.sport)
    sportGround: SportGround;

    @ManyToMany(type => SportCenter, sportCenter => sportCenter.sports)
    sportCenters: SportCenter[];

    @OneToMany(type => SportCenterSport, sportCenterSport => sportCenterSport.sport)
    sportCenterSports: SportCenterSport[];

    @OneToMany(type => SportEquipment, sportEquipment => sportEquipment.sport)
    sportEquipments: SportEquipment[];
}
