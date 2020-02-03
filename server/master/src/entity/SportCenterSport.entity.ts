import { SportCenterSportAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Sport } from './Sport.entity';
import { SportCenter } from './SportCenter.entity';

@Entity({ name: 'sport_sportcenter' })
export class SportCenterSport extends BaseEntity<SportCenterSportAttribute> implements SportCenterSportAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportCenterId: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportId: number;

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

    @ManyToOne(type => Sport, sport => sport.sportCenterSports)
    @JoinColumn({ name: "sportId" })
    sport: Sport;

    @ManyToOne(type => SportCenter, sportCenter => sportCenter.sportCenterSports)
    @JoinColumn({ name: "sportCenterId" })
    sportCenter: SportCenter;
}
