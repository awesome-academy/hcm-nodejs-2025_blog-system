import { Test, TestingModule } from '@nestjs/testing';
import { TestDataSource } from '@/data-source-test';
import { TestAppModule } from '@/app-test.module';
import { AuthService } from '../auth.service';
import { RegisterDto } from '../dto/register.dto';
import { UserRole } from '@/modules/users/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { User } from '@/modules/users/entities/user.entity';
import { Author } from '../../authors/entities/author.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

describe('AuthService Integration', () => {
  let authService: AuthService;
  let module: TestingModule;

  beforeAll(async () => {
    await TestDataSource.initialize();
    module = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    if (TestDataSource.isInitialized) {
      await TestDataSource.destroy();
    }
    await module.close();
  });

  beforeEach(async () => {
    await TestDataSource.synchronize(true);
  });

  //   it('should be defined', () => {
  //     expect(authService).toBeDefined();
  //   });

  const registerDtoUser: RegisterDto = {
    username: 'testuser',
    fullName: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
    role: UserRole.USER,
  };

  const registerDtoAuthor: RegisterDto = {
    username: 'testauthor',
    fullName: 'Test Author',
    email: 'testauthor@example.com',
    password: 'password456',
    role: UserRole.AUTHOR,
    penName: 'Pen Master',
    bio: 'I am a test author.',
  };

  const loginDto: LoginDto = {
    username: 'testuser',
    password: 'password123',
  };

  const existingUser: RegisterDto = {
    username: 'testuser',
    fullName: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
    role: UserRole.USER,
  };

  describe('Register API', () => {
    it('should throw error if username already exists', async () => {
      const hashedPassword = await bcrypt.hash(existingUser.password, 10);
      const createUser = TestDataSource.manager.create(User, {
        ...existingUser,
        passwordHash: hashedPassword,
      });
      await TestDataSource.manager.save(createUser);
      await expect(authService.register(registerDtoUser)).rejects.toThrow(
        await authService['t']('auth.username_or_email_exists'),
      );
    });

    it('should throw error if email already exists', async () => {
      const hashedPassword = await bcrypt.hash(existingUser.password, 10);
      const createUser = TestDataSource.manager.create(User, {
        ...existingUser,
        passwordHash: hashedPassword,
      });
      await TestDataSource.manager.save(createUser);
      const dto: RegisterDto = {
        ...registerDtoUser,
        username: 'newusername',
      };
      await expect(authService.register(dto)).rejects.toThrow(
        await authService['t']('auth.username_or_email_exists'),
      );
    });

    it('should register successfully as USER', async () => {
      const result = await authService.register(registerDtoUser);
      expect(result).toBeDefined();
      expect(result.username).toBe(registerDtoUser.username);

      const userInDb = await TestDataSource.manager.findOne(User, {
        where: { username: registerDtoUser.username },
      });
      expect(userInDb).toBeDefined();
      if (userInDb) {
        expect(userInDb.role).toBe(UserRole.USER);
      }
    });

    it('should register successfully as AUTHOR', async () => {
      const result = await authService.register(registerDtoAuthor);
      expect(result).toBeDefined();
      expect(result.username).toBe(registerDtoAuthor.username);

      const userInDb = await TestDataSource.manager.findOne(User, {
        where: { username: registerDtoAuthor.username },
      });
      if (userInDb) {
        const authorInDb = await TestDataSource.manager.findOne(Author, {
          where: { user: { id: userInDb.id } },
        });

        expect(userInDb).toBeDefined();
        expect(authorInDb).toBeDefined();
        if (authorInDb) {
          expect(authorInDb.penName).toBe(registerDtoAuthor.penName);
        }
      }
    });

    it('should throw register_failed on unexpected error', async () => {
      jest
        .spyOn<any, any>(authService['userRepository'], 'save')
        .mockRejectedValueOnce(new Error('Unexpected'));
      await expect(authService.register(registerDtoUser)).rejects.toThrow(
        await authService['t']('auth.register_failed'),
      );
    });
  });

  describe('Login API', () => {
    it('should throw error if user not found', async () => {
      await expect(authService.login(loginDto)).rejects.toThrow(
        await authService['t']('auth.user_not_found'),
      );
    });

    it('should throw error if password is incorrect', async () => {
      await authService.register(registerDtoUser);
      const loginDtoWrong: LoginDto = {
        username: loginDto.username,
        password: 'wrongpassword',
      };
      await expect(authService.login(loginDtoWrong)).rejects.toThrow(
        await authService['t']('auth.password_incorrect'),
      );
    });

    it('should return access_token if login successful', async () => {
      await authService.register(registerDtoUser);

      const result = await authService.login(loginDto);

      expect(result).toBeDefined();
      expect(result.access_token).toBeDefined();

      // Giải mã token để kiểm tra payload
      const jwtService = module.get(JwtService);
      const payload: any = jwtService.decode(result.access_token);

      expect(payload.username).toBe(loginDto.username);
      expect(payload.role).toBe(UserRole.USER);
    });

    it('should throw login_failed on unexpected error', async () => {
      jest
        .spyOn<any, any>(authService['userRepository'], 'findOne')
        .mockRejectedValueOnce(new Error('Unexpected'));

      await expect(authService.login(loginDto)).rejects.toThrow(
        await authService['t']('auth.login_failed'),
      );
    });
  });
});
