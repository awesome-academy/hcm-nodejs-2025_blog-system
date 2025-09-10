import { Controller, Post, Body } from '@nestjs/common';
import { PasswordResetService } from './password_reset.service';
import { ForgotPasswordDto } from './dto/password_reset.dto';

@Controller('reset')
export class PasswordResetController {
  constructor(private readonly resetService: PasswordResetService) {}

  @Post('forgot-password')
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    const message = await this.resetService.requestPasswordReset(data.email);
    return { message };
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; new_password: string }) {
    const message = await this.resetService.resetPassword(
      body.token,
      body.new_password,
    );
    return { message };
  }
}
