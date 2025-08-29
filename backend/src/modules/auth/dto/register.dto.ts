import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
import { UserRole } from '@/modules/users/entities/user.entity';
import { ValidationMessage } from '@/common/constants/validation_messages';
import { ValidationRules} from '@/common/constants/validation_rules';

export class RegisterDto {
  @ApiProperty({
    example: 'tohoai123',
    description: 'Tên đăng nhập của người dùng (không được trùng)',
  })
  @IsNotEmpty({ message: ValidationMessage.USERNAME_REQUIRED })
  @IsString({ message: ValidationMessage.USERNAME_INVALID })
  @MinLength(ValidationRules.USERNAME_MIN_LENGTH, { message: ValidationMessage.USERNAME_MIN })
  @MaxLength(ValidationRules.USERNAME_MAX_LENGTH, { message: ValidationMessage.USERNAME_MAX })
  username: string;

  @ApiProperty({
    example: 'Tô Hoài',
    description: 'Họ và tên đầy đủ của người dùng.',
  })
  @IsNotEmpty({ message: ValidationMessage.FULLNAME_REQUIRED })
  @IsString({ message: ValidationMessage.FULLNAME_INVALID })
  @MinLength(ValidationRules.FULLNAME_MIN_LENGTH, { message: ValidationMessage.FULLNAME_MIN })
  @MaxLength(ValidationRules.FULLNAME_MAX_LENGTH, { message: ValidationMessage.FULLNAME_MAX })
  fullName: string;

  @ApiProperty({ example: 'tohoai@gmail.com' })
  @IsNotEmpty({ message: ValidationMessage.EMAIL_REQUIRED })
  @IsEmail({}, { message: ValidationMessage.EMAIL_INVALID })
  email: string;

  @ApiProperty({
    example: 'tohoai321',
    description: 'Mật khẩu có ít nhất 6 ký tự.',
  })
  @IsNotEmpty({ message: ValidationMessage.PASSWORD_REQUIRED })
  @IsString({ message: ValidationMessage.PASSWORD_INVALID })
  @MinLength(ValidationRules.PASSWORD_MIN_LENGTH, { message: ValidationMessage.PASSWORD_MIN })
  password: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'Vai trò của người dùng (ví dụ: ADMIN, AUTHOR, USER).',
  })
  @IsEnum(UserRole, { message: ValidationMessage.ROLE_INVALID })
  role: UserRole;

  @ApiProperty({
    example: 'Pen Master',
    description: 'Bút danh (chỉ dành cho tác giả, có thể bỏ trống).',
    required: false,
  })
  @IsOptional()
  @IsString({ message: ValidationMessage.PENNAME_INVALID })
  @MaxLength(ValidationRules.PENNAME_MAX_LENGTH, { message: ValidationMessage.PENNAME_MAX })
  penName?: string;

  @ApiProperty({
    example: 'Tôi là một tác giả chuyên viết tiểu thuyết.',
    description: 'Tiểu sử ngắn của người dùng (có thể bỏ trống).',
    required: false,
  })
  @IsOptional()
  @IsString({ message: ValidationMessage.BIO_INVALID })
  @MaxLength(ValidationRules.BIO_MAX_LENGTH, { message: ValidationMessage.BIO_MAX })
  bio?: string;
}
