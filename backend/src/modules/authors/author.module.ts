import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorService } from './author.service';
import { Author } from '@/modules/authors/entities/author.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), SharedModule],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
