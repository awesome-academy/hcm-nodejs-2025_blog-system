import { IsOptional, IsEnum, IsString } from 'class-validator';
import { PostStatus } from '../entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FilterPostDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  authorName?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  categoryName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tagName?: string;
}
