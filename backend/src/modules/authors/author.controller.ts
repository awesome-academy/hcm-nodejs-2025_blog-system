import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AdminAuthorService } from './author.service';
import { ApprovalAuthorDto } from './dto/approval-author.dto';
import { ApiResponseData } from '@/common/interceptors/responseSwagger.interceptor';
import { AuthorSerializer } from './serializers/author.serializer';
import { MessageResponseDto } from '@/common/response/response_message';

@ApiTags('Admin - Author Management')
@Controller('authors')
export class AdminAuthorController {
  constructor(private readonly adminAuthorService: AdminAuthorService) {}

  @Get('list')
  @ApiResponseData(AuthorSerializer, true)
  async getPendingAuthors() {
    return this.adminAuthorService.getPendingAuthors();
  }

  @Patch(':id/approval')
  @ApiBody({ type: ApprovalAuthorDto })
  @ApiResponseData(MessageResponseDto)
  async updateApproval(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ApprovalAuthorDto,
  ) {
    return this.adminAuthorService.updateApproval(id, dto);
  }
}
