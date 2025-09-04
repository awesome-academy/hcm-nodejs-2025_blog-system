import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '@/modules/users/entities/user.entity';
import { Author } from '../authors/entities/author.entity';
import { RegisterDto } from './dto/register.dto';
import { UserSerializer } from '../users/serializers/user.serializer';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';
import { RequestI18nContextService } from '@/common/context/i18nContext.service';
import { BaseI18nService } from '../shared/baseI18n.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService extends BaseI18nService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    i18n: I18nService,
    context: RequestI18nContextService,
    private readonly jwtService: JwtService,
  ) {
    super(i18n, context);
  }

  async register(data: RegisterDto): Promise<UserSerializer> {
    try {
      // Kiểm tra username hoặc email đã tồn tại chưa
      const existingUser = await this.userRepository.findOne({
        where: [{ username: data.username }, { email: data.email }],
      });
      if (existingUser) {
        throw new BadRequestException(
          await this.t('auth.username_or_email_exists'),
        );
      }

      // Tạo người dùng mới
      const newUser = this.userRepository.create({
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        passwordHash: await this.hashPassword(data.password),
        role: data.role,
      });
      await this.userRepository.save(newUser);

      // Nếu user là AUTHOR thì tạo profile tác giả kèm liên kết
      if (data.role === UserRole.AUTHOR) {
        const newAuthor = this.authorRepository.create({
          penName: data.penName,
          bio: data.bio,
          user: newUser,
        });
        await this.authorRepository.save(newAuthor);
      }

      // Chuyển đổi entity thành serializer để trả về client
      return plainToInstance(UserSerializer, newUser, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(await this.t('auth.register_failed'));
    }
  }

  // Hàm băm mật khẩu trước khi lưu vào database
  private async hashPassword(password: string): Promise<string> {
    const bycrypt = await import('bcrypt');
    const saltRounds = 10;
    return bycrypt.hash(password, saltRounds);
  }

  async login(data: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { username: data.username },
      });

      if (!user) {
        throw new UnauthorizedException(
          await this.t('auth.user_not_found'),
        );
      }

      const isMatch = await bcrypt.compare(data.password, user.passwordHash);

      if (!isMatch) {
        throw new UnauthorizedException(
          await this.t('auth.password_incorrect'),
        );
      }

      const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
      };

      const token = this.jwtService.sign(payload);

      return { access_token: token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(await this.t('auth.login_failed'));
    }
  }
}
