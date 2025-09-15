import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateCategoryDto } from '@/modules/categories/dto/create-category.dto';
import { CreateTagDto } from '@/modules/tags/dto/create-tag.dto';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: false })
  @IsOptional()
  imageUrl?: string;

  // Nested category
  @ApiProperty({ type: () => CreateCategoryDto })
  @ValidateNested()
  @Type(() => CreateCategoryDto)
  category: CreateCategoryDto;

  // Nested tags
  @ApiProperty({ type: () => [CreateTagDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDto)
  tags: CreateTagDto[];
}
