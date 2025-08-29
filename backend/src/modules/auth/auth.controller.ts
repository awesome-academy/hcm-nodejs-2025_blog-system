import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { UserSerializer } from '../users/serializers/user.serializer';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() data: RegisterDto): Promise<UserSerializer> {
    const newUser = await this.authService.register(data);
    return newUser;
  }
}
