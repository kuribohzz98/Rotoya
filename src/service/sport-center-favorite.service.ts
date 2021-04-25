import { SportCenterFavorite } from './../entity/SportCenterFavorite.entity';
import { SportCenterFavoriteRepository } from './../repository/sport-center-favorite.repository';
import { Injectable } from '@nestjs/common';
import { SportCenterFavoriteAttribute } from './../interface/attribute.interface';
import { Sport } from './../entity/Sport.entity';
import { BaseService } from './../base/BaseService';

@Injectable()
export class SportCenterFavoriteService extends BaseService<
  SportCenterFavoriteRepository,
  SportCenterFavorite,
  SportCenterFavoriteAttribute
> {
  constructor(
    private readonly sportCenterFavoriteRepository: SportCenterFavoriteRepository,
  ) {
    super(sportCenterFavoriteRepository);
  }
  mapEntityToDto(entity: SportCenterFavorite): SportCenterFavorite {
    return entity;
  }
}
