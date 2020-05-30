import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const options = new DocumentBuilder()
    .setTitle('Rotoya')
    .setDescription('The Rotoya API description')
    .setVersion('1.0')
    .addTag('Rotoya')
    .build();

export function initSwagger(app: INestApplication, path?: string) {
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(path || 'api', app, document);
}
