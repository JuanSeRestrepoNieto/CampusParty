import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: Repository<Auth>;
  let jwtService: JwtService;

  const mockAuthRepository = {
    save: jest.fn(entity => Promise.resolve({ id: 1, ...entity })),
    find: jest.fn(() => Promise.resolve([{ id: 1, username: 'user1' }])),
    findOne: jest.fn(({ where }) => {
      if (where.id === 1 || where.email === 'valid@email.com') {
        return Promise.resolve({
          id: 1,
          username: 'user1',
          email: 'valid@email.com',
          password_hash: bcrypt.hashSync('password123', 10),
          role: 'campusero',
          last_login: null,
          token: null,
          created_at: new Date(),
        });
      }
      return Promise.resolve(null);
    }),
    update: jest.fn(() => Promise.resolve({ affected: 1 })),
    delete: jest.fn(() => Promise.resolve({ affected: 1 })),
    create: jest.fn(dto => dto),
  };

  const mockJwtService = {
    sign: jest.fn(() => 'mocked-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(Auth), useValue: mockAuthRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get<Repository<Auth>>(getRepositoryToken(Auth));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const dto = {
      username: 'user1',
      email: 'user1@email.com',
      password_hash: 'hashedpassword',
      role: 'admin',
    };

    expect(await service.create(dto)).toEqual({ id: 1, ...dto });
    expect(authRepository.save).toHaveBeenCalledWith(dto);
  });

  it('should return all users', async () => {
    expect(await service.findAll()).toEqual([{ id: 1, username: 'user1' }]);
    expect(authRepository.find).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    const result = await service.findOne(1);
  
    expect(result).toHaveProperty('id', 1);
    expect(result).toHaveProperty('username', 'user1');
    expect(authRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a user', async () => {
    const dto: UpdateAuthDto = { username: 'updatedUser' };
    expect(await service.update(1, dto)).toEqual({ affected: 1 });
    expect(authRepository.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a user', async () => {
    expect(await service.remove(1)).toEqual({ affected: 1 });
    expect(authRepository.delete).toHaveBeenCalledWith(1);
  });

  describe('register', () => {
    it('should throw an error if passwords do not match', async () => {
      const dto: RegisterDto = {
        username: 'user1',
        email: 'user1@email.com',
        password: 'password123',
        confirmPassword: 'wrongpassword',
      };

      await expect(service.register(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should register a user with hashed password', async () => {
      const dto: RegisterDto = {
        username: 'user1',
        email: 'user1@email.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const result = await service.register(dto);
      expect(result).toHaveProperty('id');
      expect(authRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          username: dto.username,
          password_hash: expect.any(String), // Ensure password is hashed
        })
      );
    });
  });

  describe('login', () => {
    it('should throw an error if email does not exist', async () => {
      mockAuthRepository.findOne.mockResolvedValueOnce(null);
      const dto: LoginDto = { email: 'invalid@email.com', password: 'password123' };
      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw an error if password is incorrect', async () => {
      const dto: LoginDto = { email: 'valid@email.com', password: 'wrongpassword' };
      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should return a valid JWT token if credentials are correct', async () => {
      const dto: LoginDto = { email: 'valid@email.com', password: 'password123' };
      const result = await service.login(dto);
      expect(result.access_token).toBe('mocked-jwt-token');
      expect(result.user).toHaveProperty('email', 'valid@email.com');
    });
  });

  describe('validateUser', () => {
    it('should return null if email does not exist', async () => {
      mockAuthRepository.findOne.mockResolvedValueOnce(null);
      expect(await service.validateUser('invalid@email.com', 'password123')).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      expect(await service.validateUser('valid@email.com', 'wrongpassword')).toBeNull();
    });

    it('should return user if credentials are correct', async () => {
      expect(await service.validateUser('valid@email.com', 'password123')).toHaveProperty(
        'email',
        'valid@email.com'
      );
    });
  });
});
