import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './swagger/swagger';
import { createFolder } from './helper/tools/file';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  createFolder(process.cwd() + '/assets/qrCode');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/rotoya');
  app.use(helmet());
  // app.use(csurf());
  app.enableCors();
  initSwagger(app);
  const port = app.get('PORT');
  await app.listen(port);
}
bootstrap();
