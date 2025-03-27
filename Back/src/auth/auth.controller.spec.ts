import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CanActivate } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn().mockResolvedValue({ id: 1, username: 'testuser', email: 'test@example.com' }),
    login: jest.fn().mockResolvedValue({ access_token: 'jwt-token' }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, username: 'testuser' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' }),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  const mockJwtAuthGuard: CanActivate = {
    canActivate: jest.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: mockJwtService }, // Mock JwtService
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard) // Override JwtAuthGuard to bypass authentication
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const dto: RegisterDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      await expect(controller.register(dto)).resolves.toEqual({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      });

      expect(authService.register).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const dto: LoginDto = { email: 'test@example.com', password: 'password123' };

      await expect(controller.login(dto)).resolves.toEqual({
        access_token: 'jwt-token',
      });

      expect(authService.login).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await expect(controller.findAll()).resolves.toEqual([{ id: 1, username: 'testuser' }]);
      expect(authService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      await expect(controller.findOne('1')).resolves.toEqual({ id: 1, username: 'testuser' });
      expect(authService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto: UpdateAuthDto = { username: 'updatedUser' };
      await expect(controller.update('1', dto)).resolves.toEqual({ affected: 1 });
      expect(authService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      await expect(controller.remove('1')).resolves.toEqual({ affected: 1 });
      expect(authService.remove).toHaveBeenCalledWith(1);
    });
  });
});
