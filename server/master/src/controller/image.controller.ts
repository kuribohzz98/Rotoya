import { of, from, Observable } from 'rxjs';
import { ImageService } from './../service/image.service';
import { Controller, Get, Query, Param, Header, Res } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { mergeMap, concatMap } from 'rxjs/operators';
import { Response } from 'express';

@ApiTags('Image')
@Controller('image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService
    ) { }

    @Get()
    @ApiQuery({ name: 'path', type: 'string' })
    getImage$(@Query() query: { path: string }): Observable<string> {
        console.log(query);
        return of(query).pipe(
            mergeMap(query => from(this.imageService.getImageUpload(query.path)))
        )
    }

    @Get('multiple')
    @ApiQuery({ name: 'paths', type: 'string', isArray: true })
    getImageMutiple$(@Query() query: { paths: string[] }) {
        console.log(query);
        return of(query.paths).pipe(
            mergeMap(paths => [
                paths.map(path => this.imageService.getImageSportCenter(path))
            ])
        )
    }

    @Get(':name')
    getImage(@Param('name') name: string, @Res() res: Response) {
        return res.sendFile(this.imageService.getImage(name));
    }
}
