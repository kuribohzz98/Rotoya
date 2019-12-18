import { SportAttribute } from './../interface/attribute.interface';
import { BaseEntity } from './../base/BaseEntity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { SportGround } from './SportGround.entity';

@Entity()
export class Sport extends BaseEntity<SportAttribute> implements SportAttribute {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    name?: string;

    @Column({
        type: 'varchar',
        unique: true,
        length: '45',
        nullable: true
    })
    code?: string;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt?: Date;

    @OneToOne(type => SportGround, sportGround => sportGround.sport)
    sportGround: SportGround;

}
