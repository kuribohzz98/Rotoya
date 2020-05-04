import { SportGround } from './SportGround.entity';
import { SportGroundImageAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('sport_ground_image')
export class SportGroundImage extends BaseEntity<SportGroundImageAttribute> implements SportGroundImageAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    sportGroundId: number;

    @Column({
        type: 'image',
        length: '255',
        nullable: false
    })
    image: string;

    @Column({
        type: 'datetime',
        nullable: false,
        default: 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @ManyToOne(type => SportGround, sportGround => sportGround.sportGroundImages)
    @JoinColumn({ name: 'sportGroundId' })
    sportGround: SportGround;
}