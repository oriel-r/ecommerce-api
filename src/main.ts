import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middlewares/logger';
import { ProducstSeeder } from './seeds/products/products.seeder';
import { CategoriesSeeder } from './seeds/categories/categories.seeder';
import { ValidationPipe } from '@nestjs/common';
import { UserSeeder } from './seeds/user/user.seeder';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/docs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerMiddleware);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  const categoriesSeeder = app.get(CategoriesSeeder)
  await categoriesSeeder.seed()
  const productsSeeder = app.get(ProducstSeeder)
  await productsSeeder.seed()
  const userSeeder = app.get(UserSeeder)
  await userSeeder.seed()

  const doc = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, doc)

  await app.listen(3000);
}
bootstrap();
