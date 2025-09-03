import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { I18nValidationPipe, I18nValidationExceptionFilter } from 'nestjs-i18n';
import { RequestI18nContextService } from './common/context/i18nContext.service';
import { createI18nContextMiddleware } from './common/middleware/i18Context.middleware';
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  //Cấu hình versioning cho API
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  //Pipe dùng để validate dữ liệu đầu vào
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  // Cấu hình Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API with NestJS')
    .setDescription('API design by nhan_ne')
    .setVersion('1.0')
    .build();

  // Khởi tạo và setup Swagger UI tại /api
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  //Middleware giúp lưu ngôn ngữ người dùng gửi lên trong từng request
  const contextService = app.get(RequestI18nContextService);
  app.use(createI18nContextMiddleware(contextService));

  // Cấu hình CORS để cho phép frontend truy cập
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  const port = configService.get('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
