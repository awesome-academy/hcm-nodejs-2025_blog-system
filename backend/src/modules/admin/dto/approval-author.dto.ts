import { IsEnum } from 'class-validator';
import { AuthorStatus } from '../../authors/entities/author.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ApprovalAuthorDto {
  @ApiProperty()
  @IsEnum(AuthorStatus)
  isApproved: AuthorStatus;
}
