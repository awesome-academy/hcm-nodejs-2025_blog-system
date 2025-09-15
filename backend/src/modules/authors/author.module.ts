import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthorService } from './author.service';
import { AdminAuthorController } from './author.controller';
import { Author } from '@/modules/authors/entities/author.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), SharedModule],
  providers: [AdminAuthorService],
  controllers: [AdminAuthorController],
  exports: [AdminAuthorService],
})
export class AdminAuthorModule {}
