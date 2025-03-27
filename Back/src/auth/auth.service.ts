import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return this.authRepository.save(createAuthDto);
  }

  findAll() {
    return this.authRepository.find();
  }

  findOne(id: number) {
    return this.authRepository.findOne({ where: { id } });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.authRepository.update(id, updateAuthDto);
  }

  remove(id: number) {
    return this.authRepository.delete(id);
  }

  async register(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = this.authRepository.create({
      username: registerDto.username,
      email: registerDto.email,
      password_hash: hashedPassword,
      role: 'campusero',
      created_at: new Date(),
    });

    return this.authRepository.save(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.authRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    // Update last login
    user.last_login = new Date();
    await this.authRepository.save(user);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.authRepository.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
