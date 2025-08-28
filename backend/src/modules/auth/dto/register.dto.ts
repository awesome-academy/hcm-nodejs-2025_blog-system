import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
import { UserRole } from '@/modules/users/entities/user.entity';
import { VALIDATION_MESSAGES } from '@/common/constants/validation_messages';
import { VALIDATION_RULES } from '@/common/constants/validation_rules';

export class RegisterDto {
  @ApiProperty({
    example: 'tohoai123',
    description: 'Tên đăng nhập của người dùng (không được trùng)',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.USERNAME_REQUIRED })
  @IsString({ message: VALIDATION_MESSAGES.USERNAME_INVALID })
  @MinLength(VALIDATION_RULES.USERNAME_MIN_LENGTH, { message: VALIDATION_MESSAGES.USERNAME_MIN })
  @MaxLength(VALIDATION_RULES.USERNAME_MAX_LENGTH, { message: VALIDATION_MESSAGES.USERNAME_MAX })
  username: string;

  @ApiProperty({
    example: 'Tô Hoài',
    description: 'Họ và tên đầy đủ của người dùng.',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.FULLNAME_REQUIRED })
  @IsString({ message: VALIDATION_MESSAGES.FULLNAME_INVALID })
  @MinLength(VALIDATION_RULES.FULLNAME_MIN_LENGTH, { message: VALIDATION_MESSAGES.FULLNAME_MIN })
  @MaxLength(VALIDATION_RULES.FULLNAME_MAX_LENGTH, { message: VALIDATION_MESSAGES.FULLNAME_MAX })
  fullName: string;

  @ApiProperty({ example: 'tohoai@gmail.com' })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.EMAIL_REQUIRED })
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL_INVALID })
  email: string;

  @ApiProperty({
    example: 'tohoai321',
    description: 'Mật khẩu có ít nhất 6 ký tự.',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD_REQUIRED })
  @IsString({ message: VALIDATION_MESSAGES.PASSWORD_INVALID })
  @MinLength(VALIDATION_RULES.PASSWORD_MIN_LENGTH, { message: VALIDATION_MESSAGES.PASSWORD_MIN })
  password: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'Vai trò của người dùng (ví dụ: ADMIN, AUTHOR, USER).',
  })
  @IsEnum(UserRole, { message: VALIDATION_MESSAGES.ROLE_INVALID })
  role: UserRole;

  @ApiProperty({
    example: 'Pen Master',
    description: 'Bút danh (chỉ dành cho tác giả, có thể bỏ trống).',
    required: false,
  })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.PENNAME_INVALID })
  @MaxLength(VALIDATION_RULES.PENNAME_MAX_LENGTH, { message: VALIDATION_MESSAGES.PENNAME_MAX })
  penName?: string;

  @ApiProperty({
    example: 'Tôi là một tác giả chuyên viết tiểu thuyết.',
    description: 'Tiểu sử ngắn của người dùng (có thể bỏ trống).',
    required: false,
  })
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.BIO_INVALID })
  @MaxLength(VALIDATION_RULES.BIO_MAX_LENGTH, { message: VALIDATION_MESSAGES.BIO_MAX })
  bio?: string;
}
