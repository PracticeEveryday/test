import * as fs from 'fs';
import * as basicAuth from 'express-basic-auth';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SWAGGER_API_CURRENT_VERSION, SWAGGER_API_NAME, SWAGGER_API_ROOT, SWAGGER_SERVER_ONE, SWAGGER_SERVER_ONE_DESC } from './const';

export function setupSwagger(app: INestApplication): void {
  const SWAGGER_USER = process.env['SWAGGER_USER']!;

  app.use(
    [SWAGGER_API_ROOT],
    basicAuth({
      challenge: true,
      users: {
        [SWAGGER_USER]: process.env['SWAGGER_PASSWORD']!,
      },
    }),
  );

  const swaggerInfo = fs.readFileSync('src/libs/swagger/swagger-info.md', 'utf-8');

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(swaggerInfo)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addServer(SWAGGER_SERVER_ONE, SWAGGER_SERVER_ONE_DESC)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
