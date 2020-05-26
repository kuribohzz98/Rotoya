import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SportCenter } from './SportCenter.entity';
import { User } from './User.entity';
import { BaseEntity } from './../base/BaseEntity';
import { SportCenterFavoriteAttribute } from './../interface/attribute.interface';

@Entity('sport_center_favorite')
export class SportCenterFavorite extends BaseEntity<SportCenterFavoriteAttribute> implements SportCenterFavoriteAttribute {
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
    userId: number;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @ManyToOne(type => User, user => user.sportCenterFavorites)
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(type => SportCenter, sportCenter => sportCenter.sportCenterFavorites)
    @JoinColumn({ name: "sportCenterId" })
    sportCenter: SportCenter;
}