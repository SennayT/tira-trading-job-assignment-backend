import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation')
    .addBearerAuth()
    .addCookieAuth('x-refresh-token')
    .setVersion('v1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('explorer', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      plugins: [
        () => {
          return {
            wrapComponents: {
              curl: () => () => null,
            },
          };
        },
      ],
    },
  });

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization', 'X-refresh-token'],
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  await app.listen(4000);
}
bootstrap();
