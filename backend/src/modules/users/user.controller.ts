import {
  Controller,
  Get,
  Patch,
  Body,
  Req,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/change-password.dto';
import { UserSerializer } from './serializers/user.serializer';
import { ApiResponseData } from '@/common/interceptors/responseSwagger.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessageResponseDto } from '@/common/response/response_message';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiResponseData(UserSerializer)
  async getProfile(@Req() req): Promise<UserSerializer> {
    return this.userService.getProfileById(req.user.id);
  }

  @Patch('profile')
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponseData(UserSerializer)
  @UseInterceptors(FileInterceptor('file'))
  async updateProfile(
    @Body() data: UpdateProfileDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserSerializer> {
    return this.userService.updateProfile(data, req.user.id, file);
  }

  @Patch('profile/password')
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponseData(MessageResponseDto)
  async changePassword(
    @Body() data: UpdatePasswordDto,
    @Req() req,
  ): Promise<{ message: string }> {
    return this.userService.changePassword(data, req.user.id);
  }
}
