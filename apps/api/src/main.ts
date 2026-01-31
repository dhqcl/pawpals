import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedWiki } from './seeds/wiki.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for frontend

  // Seeding
  const dataSource = app.get(DataSource);
  await seedWiki(dataSource);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
