import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);
  nestApp.listen(3001);
  const urlRedis = nestApp.get('URL_REDIS');
  const app = nestApp.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: `redis://${urlRedis}`
    }
  })
  app.listen(() => console.log(`Microservice is listening at ${urlRedis}`));
}
bootstrap();
