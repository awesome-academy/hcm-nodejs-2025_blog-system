import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '@/modules/users/entities/user.entity';
import { Author } from '../authors/entities/author.entity';
import { RegisterDto } from './dto/register.dto';
import { UserSerializer } from '../users/serializers/user.serializer';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async register(data: RegisterDto): Promise<UserSerializer> {
    // Kiểm tra username hoặc email đã tồn tại chưa
    const existingUser = await this.userRepository.findOne({
      where: [{ username: data.username }, { email: data.email }],
    });
    if (existingUser) {
      throw new BadRequestException('Username hoặc email đã được sử dụng');
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
  }

  // Hàm băm mật khẩu trước khi lưu vào database
  private async hashPassword(password: string): Promise<string> {
    const bycrypt = await import('bcrypt');
    const saltRounds = 10;
    return bycrypt.hash(password, saltRounds);
  }
}
