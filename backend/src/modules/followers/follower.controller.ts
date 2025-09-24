import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { FollowersService } from './follower.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseData } from '@/common/interceptors/responseSwagger.interceptor';
import { MessageResponseDto } from '@/common/response/response_message';
import { FollowerSerializer } from './serializers/follower.serializer';

@ApiTags('Followers')
@UseGuards(JwtAuthGuard)
@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  // User follow author
  @Post('follow/:authorId')
  follow(@Req() req, @Param('authorId', ParseIntPipe) authorId: number) {
    const userId = req.user.id;
    return this.followersService.followAuthor(userId, authorId);
  }

  // User unfollow author
  @Delete('unfollow/:authorId')
  @ApiResponseData(MessageResponseDto)
  unfollow(@Req() req, @Param('authorId', ParseIntPipe) authorId: number) {
    const userId = req.user.id;
    return this.followersService.unfollowAuthor(userId, authorId);
  }

  // Lấy danh sách author mà user đang follow
  @Get('user')
  @ApiResponseData(FollowerSerializer, true)
  getFollowedAuthors(@Req() req) {
    const userId = req.user.id;
    return this.followersService.getFollowedAuthors(userId);
  }
}
