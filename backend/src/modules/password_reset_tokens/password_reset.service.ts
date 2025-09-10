import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordResetToken } from './entities/password_reset.entity';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { MailJob } from '@/common/jobs/mail/mail.job';
import { generateToken } from '@/common/utils/generateToken.util';

@Injectable()
export class PasswordResetService {
  private readonly resetTokenExpiresInMinutes = Number(
    process.env.EMAIL_TOKEN_EXPIRES_IN_MIN,
  );

  constructor(
    @InjectRepository(PasswordResetToken)
    private resetRepo: Repository<PasswordResetToken>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly i18n: I18nService,
    private readonly mailJob: MailJob,
  ) {}

  async requestPasswordReset(email: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(
        await this.i18n.t('user.user_not_found_by_email'),
      );
    }

    const token = generateToken();
    const tokenHash = await bcrypt.hash(token, 10);
    const createdAt = new Date(Date.now());
    const expiresAt = new Date(
      Date.now() + this.resetTokenExpiresInMinutes * 60 * 1000,
    );

    // Ghi đè token cũ nếu email đã có
    await this.resetRepo.upsert(
      {
        email,
        tokenHash,
        expiresAt,
        createdAt,
        used: false,
      },
      ['email'],
    );

    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const subject = await this.i18n.t('auth.password_reset_subject');

    await this.mailJob.sendResetPasswordMail({
      email,
      link,
      expiresInMinutes: this.resetTokenExpiresInMinutes,
      subject,
    });

    return await this.i18n.t('auth.reset_link_sent');
  }

  async resetPassword(token: string, newPassword: string): Promise<string> {
    const records = await this.resetRepo.find();

    // So sánh hash token
    const record = records.find((r) => bcrypt.compareSync(token, r.tokenHash));

    if (!record || record.used || record.expiresAt.getTime() < Date.now()) {
      throw new BadRequestException(
        await this.i18n.t('auth.token_invalid_or_expired'),
      );
    }

    const user = await this.userRepository.findOne({
      where: { email: record.email },
    });
    if (user) {
      user.passwordHash = await bcrypt.hash(newPassword, 10);
      await this.userRepository.save(user);
    }

    // Đánh dấu token đã dùng
    record.used = true;
    await this.resetRepo.save(record);

    return await this.i18n.t('auth.password_reset_success');
  }
}
