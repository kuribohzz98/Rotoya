import { Injectable } from '@nestjs/common';
import { ConfigService } from './../config/config.service';

@Injectable()
export class ImageService {
    constructor(
        private readonly configService: ConfigService
    ) {}

    getImage(path: string) {
        return this.configService.get('path_file_upload') + path;
    }
}