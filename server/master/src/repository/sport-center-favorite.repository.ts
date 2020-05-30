import { EntityRepository } from "typeorm";
import { SportCenterFavorite } from './../entity/SportCenterFavorite.entity';
import { SportCenterFavoriteAttribute } from './../interface/attribute.interface';
import { BaseRepository } from './../base/BaseRepository';

@EntityRepository(SportCenterFavorite)
export class SportCenterFavoriteRepository extends BaseRepository<SportCenterFavorite, SportCenterFavoriteAttribute>  {

}