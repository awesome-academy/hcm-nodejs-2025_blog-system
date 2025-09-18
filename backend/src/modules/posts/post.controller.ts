import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  Put
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostSerializer } from './serializers/post.serializer';
import { ApiResponseData } from '@/common/interceptors/responseSwagger.interceptor';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageResponseDto } from '@/common/response/response_message';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Posts')
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @ApiBody({ type: CreatePostDto })
  @ApiResponseData(PostSerializer)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() req,
    @Body() dto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostSerializer> {
    return this.postService.create(req.user.id, dto, file);
  }
  @Get('authorPost')
  @ApiResponseData(PostSerializer, true)
  async getPostsByAuthor(@Req() req): Promise<PostSerializer[]> {
    return this.postService.getMyPosts(req.user.id);
  }

  @Delete('softDelete/:id')
  @ApiResponseData(MessageResponseDto)
  async softDelete(@Param('id') id: number) {
    return this.postService.softDeletePost(id);
  }

  @Put('update/:id')
  @ApiBody({ type: UpdatePostDto })
  @ApiResponseData(PostSerializer)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: number,
    @Body() dto: UpdatePostDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<PostSerializer> {
    return this.postService.updatePost(id, dto, file);
  }
}
