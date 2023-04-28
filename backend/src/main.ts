import { UserService } from './modules/user/user.service';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { ConfigEnum, IServerConfig, ISwaggerConfig } from '@lib/types';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    session({
      secret: 'this shoudl be secret', // Replace with your own secret
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
      },
    })
  );
  app.enableCors({
    origin: 'http://localhost:3000',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  const logger = new Logger('Bootstrap');
  app.setGlobalPrefix('api');
  const configService = app.get<ConfigService>(ConfigService);
  const userService = app.get<UserService>(UserService);
  await userService.createAdmin();
  const { port: SERVER_PORT } = configService.get<IServerConfig>(
    ConfigEnum.SERVER
  );

  const swaggerConfig = configService.get<ISwaggerConfig>(ConfigEnum.SWAGGER);

  // swagger configuration
  const swaggerConfigDoc = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfigDoc);
  SwaggerModule.setup('api', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(SERVER_PORT);
  logger.log(`Server is running on: ${await app.getUrl()}`);
}
bootstrap();
