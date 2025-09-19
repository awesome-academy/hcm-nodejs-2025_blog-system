import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PostStatus } from '../../posts/entities/post.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApprovalPostDto {
  @ApiProperty({ enum: PostStatus })
  @IsEnum(PostStatus)
  status: PostStatus;

  @ApiPropertyOptional({
    description: 'Lý do từ chối bài viết, chỉ khi status = rejected',
    type: String,
  })
  @IsOptional()
  @IsString()
  rejectionReason?: string;
}
