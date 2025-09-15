import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ValidationRules } from '@/common/constants/validation_rules';
import { ValidationMessage } from '@/common/constants/validation_messages';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'oldPassword123',
    description: 'Mật khẩu hiện tại của người dùng.',
  })
  @IsNotEmpty({
    message: i18nValidationMessage(ValidationMessage.PASSWORD_REQUIRED),
  })
  @IsString({
    message: i18nValidationMessage(ValidationMessage.PASSWORD_INVALID),
  })
  @MinLength(ValidationRules.PASSWORD_MIN_LENGTH, {
    message: i18nValidationMessage(ValidationMessage.PASSWORD_MIN, {
      args: { min: ValidationRules.PASSWORD_MIN_LENGTH },
    }),
  })
  currentPassword: string;

  @ApiProperty({
    example: 'newPassword123',
    description: 'Mật khẩu mới (ít nhất 6 ký tự).',
  })
  @IsNotEmpty({
    message: i18nValidationMessage(ValidationMessage.PASSWORD_REQUIRED),
  })
  @IsString({
    message: i18nValidationMessage(ValidationMessage.PASSWORD_INVALID),
  })
  @MinLength(ValidationRules.PASSWORD_MIN_LENGTH, {
    message: i18nValidationMessage(ValidationMessage.PASSWORD_MIN, {
      args: { min: ValidationRules.PASSWORD_MIN_LENGTH },
    }),
  })
  newPassword: string;

  @ApiProperty({
    example: 'newPassword123',
    description: 'Xác nhận mật khẩu mới.',
  })
  @IsNotEmpty({
    message: i18nValidationMessage(ValidationMessage.PASSWORD_REQUIRED),
  })
  @IsString({
    message: i18nValidationMessage(ValidationMessage.PASSWORD_INVALID),
  })
  confirmPassword: string;
}
