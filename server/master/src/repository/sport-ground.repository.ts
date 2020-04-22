import { SportGround } from './../entity/SportGround.entity';
import { SportGroundAttribute } from './../interface/attribute.interface';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from "typeorm";

@EntityRepository(SportGround)
export class SportGroundRepository extends BaseRepository<SportGround, SportGroundAttribute>  {

}