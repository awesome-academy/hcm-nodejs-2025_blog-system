import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

import { ConfigModule } from '@nestjs/config';

//I18n
import {
  I18nModule,
  I18nJsonLoader,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { RequestI18nContextService } from './common/context/i18nContext.service';
import { I18N_CONFIG } from './common/constants/i18n.constant';

import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: I18N_CONFIG.fallbackLanguage,
      fallbacks: I18N_CONFIG.fallbacks,
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
        flatten: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    RequestI18nContextService,
  ],
})
export class AppModule {}
