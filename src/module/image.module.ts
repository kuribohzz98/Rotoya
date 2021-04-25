import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as uuid from 'uuid/v4';
import { ConfigService } from './../config/config.service';
import { ConfigModule } from './../config/config.module';
import { ImageController } from './../controller/image.controller';
import { ImageService } from './../service/image.service';

const editFileName = (req, file, callback) => {
  const filename = uuid() + extname(file.originalname);
  callback(null, filename);
};

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get('path_file_upload'),
          filename: editFileName.bind(this),
        }),
        fileFilter: (req, file, callback) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
          }
          callback(null, true);
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
