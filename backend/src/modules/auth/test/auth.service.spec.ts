import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { RequestI18nContextService } from '@/common/context/i18nContext.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Author } from '../../authors/entities/author.entity';
import {
  createMockRepository,
  createMockI18nService,
  createMockRequestI18nContextService,
} from '../../../../test-utils/base-test.util';
import { UserRole } from '@/modules/users/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserRepo = createMockRepository<User>();
  const mockAuthorRepo = createMockRepository<Author>();
  const mockI18nService = createMockI18nService();
  const mockRequestContext = createMockRequestI18nContextService();

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  //Mock data
  const mockRegisterDtoUser: RegisterDto = {
    username: 'testuser',
    fullName: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
    role: UserRole.USER,
  };

  const mockRegisterDtoAuthor: RegisterDto = {
    username: 'testauthor',
    fullName: 'Test Author',
    email: 'testauthor@example.com',
    password: 'password456',
    role: UserRole.AUTHOR,
    penName: 'Pen Master',
    bio: 'I am a test author.',
  };

  const mockLoginDto: LoginDto = {
    username: 'testuser',
    password: 'password123',
  };

  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'testuser@example.com',
    passwordHash: 'password123',
    role: UserRole.USER,
  };

  const mockAuthor = {
    id: 2,
    username: 'testauthor',
    email: 'testauthor@example.com',
    passwordHash: 'password456',
    role: UserRole.AUTHOR,
    penName: 'Pen Master',
    bio: 'I am a test author.',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: I18nService, useValue: mockI18nService },
        { provide: RequestI18nContextService, useValue: mockRequestContext },
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
        { provide: getRepositoryToken(Author), useValue: mockAuthorRepo },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Register API', () => {
    it('should throw error if username already exists', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValue(mockUser);

      await expect(service.register(mockRegisterDtoUser)).rejects.toThrow(
        'auth.username_or_email_exists',
      );
      expect(mockUserRepo.findOne).toHaveBeenCalled();
    });

    it('should throw error if email already exists', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValue(mockUser);

      await expect(service.register(mockRegisterDtoUser)).rejects.toThrow(
        'auth.username_or_email_exists',
      );
      expect(mockUserRepo.findOne).toHaveBeenCalled();
    });

    it('should register successfully as USER', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValue(null);
      (mockUserRepo.create as jest.Mock).mockReturnValue(mockUser);
      (mockUserRepo.save as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.register(mockRegisterDtoUser);

      expect(mockUserRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          username: mockRegisterDtoUser.username,
          email: mockRegisterDtoUser.email,
          role: UserRole.USER,
        }),
      );
      expect(mockUserRepo.save).toHaveBeenCalledWith(mockUser);
      expect(result).toMatchObject({
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        role: mockUser.role,
      });
      expect(mockAuthorRepo.create).not.toHaveBeenCalled();
    });

    it('should register successfully as AUTHOR', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValue(null);
      (mockUserRepo.create as jest.Mock).mockReturnValue(mockAuthor);
      (mockUserRepo.save as jest.Mock).mockResolvedValue(mockAuthor);

      const newAuthorEntity = { ...mockAuthor, user: mockAuthor };
      (mockAuthorRepo.create as jest.Mock).mockReturnValue(newAuthorEntity);
      (mockAuthorRepo.save as jest.Mock).mockResolvedValue(newAuthorEntity);

      const result = await service.register(mockRegisterDtoAuthor);

      expect(mockUserRepo.create).toHaveBeenCalled();
      expect(mockUserRepo.save).toHaveBeenCalled();
      expect(mockAuthorRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          penName: mockRegisterDtoAuthor.penName,
          bio: mockRegisterDtoAuthor.bio,
          user: mockAuthor,
        }),
      );
      expect(mockAuthorRepo.save).toHaveBeenCalled();
      expect(result).toMatchObject({
        id: mockAuthor.id,
        username: mockAuthor.username,
        email: mockAuthor.email,
        role: UserRole.AUTHOR,
      });
    });

    it('should throw register_failed on unexpected error', async () => {
      (mockUserRepo.findOne as jest.Mock).mockRejectedValue(
        new Error('DB connection lost'),
      );
      await expect(service.register(mockRegisterDtoUser)).rejects.toThrow(
        'auth.register_failed',
      );
    });
  });

  describe('Login API', () => {
    it('should throw error if user not found', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.login(mockLoginDto)).rejects.toThrow(
        'auth.user_not_found',
      );
      expect(mockUserRepo.findOne).toHaveBeenCalledWith({
        where: { username: mockLoginDto.username },
      });
    });
    it('should throw error if password is incorrect', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(service.login(mockLoginDto)).rejects.toThrow(
        'auth.password_incorrect',
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockLoginDto.password,
        mockUser.passwordHash,
      );
    });
    it('should return access_token if login successful', async () => {
      (mockUserRepo.findOne as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.login(mockLoginDto);

      expect(result).toEqual({ access_token: 'mocked-jwt-token' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        username: mockUser.username,
        role: mockUser.role,
      });
    });
    it('should throw login_failed on unexpected error', async () => {
      (mockUserRepo.findOne as jest.Mock).mockRejectedValue(
        new Error('DB error'),
      );

      await expect(service.login(mockLoginDto)).rejects.toThrow(
        'auth.login_failed',
      );
    });
  });
});
