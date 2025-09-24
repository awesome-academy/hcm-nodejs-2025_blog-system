import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { ApprovalAuthorDto } from '../admin/dto/approval-author.dto';
import { ApiResponseData } from '@/common/interceptors/responseSwagger.interceptor';
import { AuthorSerializer } from '../authors/serializers/author.serializer';
import { MessageResponseDto } from '@/common/response/response_message';
import { ApprovalPostDto } from './dto/approval-post.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostSerializer } from '../posts/serializers/post.serializer';
import { FilterPostDto } from '../posts/dto/filter-post.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Get('listAuthor')
  @ApiResponseData(AuthorSerializer, true)
  async getPendingAuthors() {
    return this.adminService.getPendingAuthors();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/approvalAuthor')
  @ApiBody({ type: ApprovalAuthorDto })
  @ApiResponseData(MessageResponseDto)
  async updateApproval(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ApprovalAuthorDto,
  ) {
    return this.adminService.approvalAuthor(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('approvalPost/:id')
  @ApiBody({ type: ApprovalPostDto })
  @ApiResponseData(MessageResponseDto)
  async approvePost(@Param('id') id: number, @Body() dto: ApprovalPostDto) {
    return this.adminService.approvalPost(id, dto);
  }

  @Get('allAuthor')
  @ApiResponseData(AuthorSerializer, true)
  async getAllListAuthors() {
    return this.adminService.getAllAuthors();
  }

  @UseGuards(JwtAuthGuard)
  @Get('listPost')
  @ApiResponseData(PostSerializer, true)
  async getAllPosts(@Query() filter: FilterPostDto): Promise<PostSerializer[]> {
    return this.adminService.getAllPosts(filter);
  }
}
