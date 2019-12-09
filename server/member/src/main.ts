import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstraps() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstraps();
