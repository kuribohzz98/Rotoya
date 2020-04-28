import { ConfigService } from './../config/config.service';
import { Injectable } from '@nestjs/common';
import { readFileImg } from '../helper/tools/file';

@Injectable()
export class ImageService {
    constructor(
        private readonly configService: ConfigService
    ) {}

    getImage(path: string) {
        return this.configService.get('path_file_upload') + path;
    }
}