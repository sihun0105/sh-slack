import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import passport from 'passport';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  if (process.env.NODE_ENV === 'product') {
    app.enableCors({
      origin: ['https://shslack.com'],
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });
  app.use(morgan('dev'));
  const config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('Sleact API개발을 위한 API문서')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`listen on port ${port}`);
}
bootstrap();
