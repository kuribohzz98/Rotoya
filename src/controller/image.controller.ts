import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Param, Res, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiProperty } from '@nestjs/swagger';
import { Response } from 'express';
import { ImageService } from './../service/image.service';

class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}


@ApiTags('Image')
@Controller('image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService
    ) { }

    @Get(':name')
    getImage(@Param('name') name: string, @Res() res: Response) {
        return res.sendFile(this.imageService.getImage(name));
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: FileUploadDto,
    })
    uploadFile(@UploadedFile() file: any) {
        return { filename: file.filename }
    }

}
