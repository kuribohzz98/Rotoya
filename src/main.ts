import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './swagger/swagger';
import { createFolder } from './helper/tools/file';
import { Providers } from './constants/provider.constants';
import * as helmet from 'helmet';
// import * as rateLimit from 'express-rate-limit';
// import * as csurf from 'csurf';

async function bootstrap() {
  createFolder(process.cwd() + '/assets/qrCode');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(app.get(Providers.GlobalPrefix));
  app.use(helmet());
  app.enableCors();
  // app.use(csurf());
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );
  app.useGlobalPipes(app.get(Providers.GlobalPipe));
  initSwagger(app, app.get(Providers.PathSwagger));
  const port = app.get(Providers.Port);
  await app.listen(port);
}
bootstrap();
