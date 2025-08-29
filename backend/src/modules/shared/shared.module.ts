import { Module } from '@nestjs/common';
import { RequestI18nContextService } from '@/common/context/i18nContext.service';

@Module({
  providers: [RequestI18nContextService],
  exports: [RequestI18nContextService],
})
export class SharedModule {}
