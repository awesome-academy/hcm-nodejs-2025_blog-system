import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { TestDataSource } from './data-source-test';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { RequestI18nContextService } from './common/context/i18nContext.service';

//I18n
import {
  I18nModule,
  I18nJsonLoader,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { I18N_CONFIG } from './common/constants/i18n.constant';

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

    TypeOrmModule.forRoot({
      ...TestDataSource.options,
    }),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    RequestI18nContextService,
  ],
})
export class TestAppModule {}
