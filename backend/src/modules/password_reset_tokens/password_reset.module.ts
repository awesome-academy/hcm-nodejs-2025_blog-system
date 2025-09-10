import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PasswordResetToken } from './entities/password_reset.entity';
import { PasswordResetService } from './password_reset.service';
import { PasswordResetController } from './password_reset.controller';
import { MailModule } from '@/common/jobs/mail/mail.module';
@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetToken, User]), MailModule],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
})
export class PasswordResetModule {}
