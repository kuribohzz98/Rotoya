import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app);
  const port = app.get('PORT');
  await app.listen(port);
}
bootstrap();
