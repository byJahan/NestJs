import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // <-- allows any origin in dev
  await app.listen(3000);
  console.log('NestJS listening on http://localhost:3000');
}
bootstrap();