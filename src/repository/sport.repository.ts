import { SportAttribute } from './../interface/attribute.interface';
import { Sport } from './../entity/Sport.entity';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from 'typeorm';

@EntityRepository(Sport)
export class SportRepository extends BaseRepository<Sport, SportAttribute> {}
