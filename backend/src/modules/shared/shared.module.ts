import { Module } from '@nestjs/common';
import { RequestI18nContextService } from '@/common/context/i18nContext.service';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [RequestI18nContextService, CloudinaryService],
  exports: [RequestI18nContextService, CloudinaryService],
})
export class SharedModule {}
