import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportCenterFavoriteController } from './../controller/sport-center-favorite.controller';
import { SportCenterFavoriteService } from './../service/sport-center-favorite.service';
import { SportCenterFavoriteRepository } from './../repository/sport-center-favorite.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SportCenterFavoriteRepository])],
  providers: [SportCenterFavoriteService],
  controllers: [SportCenterFavoriteController],
  exports: [SportCenterFavoriteService],
})
export class SportCenterFavoriteModule {}
