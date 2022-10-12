import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.use(helmet());
  await app.listen(process.env.PORT, () => {
    console.log(`Worklog API server is running at ${process.env.PORT}`);
  });
}
bootstrap();
