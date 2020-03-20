import { ImageController } from './../controller/image.controller';
import { ImageService } from './../service/image.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [ImageService],
    controllers: [ImageController]
})
export class ImageModule { }
