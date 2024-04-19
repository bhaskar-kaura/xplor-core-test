import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
// import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { CustomValidationPipe } from './common/validation/custom.validation';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  // Create a Nest application instance
  const app = await NestFactory.create(AppModule, { cors: true });

  // Use Helmet to secure the application by setting various HTTP headers
  app.use(helmet());

  // Uncomment to use a global exception filter
  // app.useGlobalFilters(new GlobalExceptionFilter());

  // Uncomment to use a custom validation pipe
  // app.useGlobalPipes(new CustomValidationPipe());

  // Use the built-in ValidationPipe for class-based validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Retrieve the ConfigService to access environment variables
  const configService = app.get(ConfigService);

  // Set a global prefix for all routes, excluding specified routes
  app.setGlobalPrefix('api/v1', { exclude: ['/', '/health', '/e-auth/callback'] });

  // Configure Swagger/OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle('Core API')
    .setDescription('This API is root for all other APIs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  // Start the application on the port specified in the environment variables
  await app.listen(configService.get<string>('port'));
}

// Bootstrap the application
bootstrap();
