import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UserRole } from '@/modules/users/entities/user.entity';
import { ValidationRules } from '@/common/constants/validation_rules';
import { ValidationMessage } from '@/common/constants/validation_messages';

export class RegisterDto {
  @ApiProperty({
    example: 'tohoai123',
    description: 'Tên đăng nhập của người dùng (không được trùng)',
  })
  @IsNotEmpty({
    message: i18nValidationMessage(ValidationMessage.USERNAME_REQUIRED),
  })
  @IsString({
    message: i18nValidationMessage(ValidationMessage.USERNAME_INVALID),
  })
  @MinLength(ValidationRules.USERNAME_MIN_LENGTH, {
    message: i18nValidationMessage(ValidationMessage.USERNAME_MIN, {
      args: { min: ValidationRules.USERNAME_MIN_LENGTH },
    }),
  })
  @MaxLength(ValidationRules.USERNAME_MAX_LENGTH, {
    message: i18nValidationMessage(ValidationMessage.USERNAME_MAX, {
      args: { max: ValidationRules.USERNAME_MAX_LENGTH },
    }),
  })
  username: string;

  @ApiProperty({
    example: 'Tô Hoài',
    description: 'Họ và tên đầy đủ của người dùng.',
  })
  @IsNotEmpty({
    message: i18nValidationMessage(ValidationMessage.FULLNAME_REQUIRED),
  })
  @IsString({
    message: i18nValidationMessage(ValidationMessage.FULLNAME_INVALID),
  })
  @MinLength(ValidationRules.FULLNAME_MIN_LENGTH, {
    message: i18nValidationMessage(ValidationMessage.FULLNAME_MIN, {
      args: { min: ValidationRules.FULLNAME_MIN_LENGTH },
    }),
  })
  @MaxLength(ValidationRules.FULLNAME_MAX_LENGTH, {
    message: i18nValidationMessage(ValidationMessage.FULLNAME_MAX, {
      args: { max: ValidationRules.FULLNAME_MAX_LENGTH },
    }),
  })
  fullName: string;

  @ApiProperty({ example: 'tohoai@gmail.com' })
  @IsNotEmpty({
    message: i18nValidationMessage(ValidationMessage.EMAIL_REQUIRED),
  })
  @IsEmail(
    {},
    { message: i18nValidationMessage(ValidationMessage.EMAIL_INVALID) },
  )
  email: string;

  @ApiProperty({
    example: 'tohoai321',
    description: 'Mật khẩu có ít nhất 6 ký tự.',
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
  password: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'Vai trò của người dùng (ví dụ: ADMIN, AUTHOR, USER).',
  })
  @IsEnum(UserRole, {
    message: i18nValidationMessage(ValidationMessage.ROLE_INVALID),
  })
  role: UserRole;

  @ApiProperty({
    example: 'Pen Master',
    description: 'Bút danh (chỉ dành cho tác giả, có thể bỏ trống).',
    required: false,
  })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage(ValidationMessage.PENNAME_INVALID),
  })
  @MaxLength(ValidationRules.PENNAME_MAX_LENGTH, {
    message: i18nValidationMessage(ValidationMessage.PENNAME_MAX, {
      args: { max: ValidationRules.PENNAME_MAX_LENGTH },
    }),
  })
  penName?: string;

  @ApiProperty({
    example: 'Tôi là một tác giả chuyên viết tiểu thuyết.',
    description: 'Tiểu sử ngắn của người dùng (có thể bỏ trống).',
    required: false,
  })
  @IsOptional()
  @IsString({ message: i18nValidationMessage(ValidationMessage.BIO_INVALID) })
  @MaxLength(ValidationRules.BIO_MAX_LENGTH, {
    message: i18nValidationMessage(ValidationMessage.BIO_MAX, {
      args: { max: ValidationRules.BIO_MAX_LENGTH },
    }),
  })
  bio?: string;
}
