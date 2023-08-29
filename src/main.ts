import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('The tasks API description')
    .setVersion('1.0')
    .addTag('tasks')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  logger.log(`DATABASE_PASSWORD: ${process.env.DATABASE_PASSWORD}`);
  await app.listen(3000);
}
bootstrap();
