import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  IsUrl,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ValidationRules } from '@/common/constants/validation_rules';
import { ValidationMessage } from '@/common/constants/validation_messages';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'Tô Hoài',
    description: 'Họ và tên đầy đủ của người dùng.',
    required: false,
  })
  @IsOptional()
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
  fullName?: string;

  @ApiProperty({
    description: 'URL ảnh đại diện của người dùng.',
    required: false,
  })
  @IsOptional()
  @IsString({
    message: i18nValidationMessage(ValidationMessage.AVATAR_INVALID),
  })
  @IsUrl(
    { protocols: ['http', 'https'], require_tld: true },
    { message: i18nValidationMessage(ValidationMessage.AVATAR_INVALID) },
  )
  @MaxLength(ValidationRules.URL_MAX_LENGTH, {
    message: i18nValidationMessage(ValidationMessage.AVATAR_MAX, {
      args: { max: ValidationRules.URL_MAX_LENGTH },
    }),
  })
  avatarUrl?: string;

  // Chỉ dành cho author
  @ApiProperty({
    example: 'Pen Master',
    description: 'Bút danh (chỉ dành cho tác giả).',
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
    description: 'Tiểu sử ngắn của người dùng.',
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
