import { ConfigService } from './../config/config.service';
import { Injectable } from '@nestjs/common';
import { readFileImg } from '../helper/tools/file';

@Injectable()
export class ImageService {
    constructor(
        private readonly configService: ConfigService
    ) {}

    async getImageUpload(path: string): Promise<string> {
        return Promise.resolve(readFileImg(this.configService.get('path_file_upload') + path));
    }

    getImageSportCenter(path: string) {
        return {
            path,
            image: readFileImg(this.configService.get('path_file_upload') + path)
        }
    }

    getImage(path: string) {
        return this.configService.get('path_file_upload') + path;
    }
}