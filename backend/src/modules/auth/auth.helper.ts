import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum, IJwtConfig } from '@lib/types';
@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  @Inject(ConfigService)
  private readonly configService: ConfigService;
  private readonly jwt: JwtService;
  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }
  // Generate JWT Token
  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public async encodePassword(password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  public generateToken(user: User): string {
    return this.jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      {
        secret:
          process.env.JWT_SECRET ||
          this.configService.get<IJwtConfig>(ConfigEnum.JWT_TOKEN).secret,
      }
    );
  }

  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    const user = await this.repository.findOne({ where: { id: decoded.id } });
    delete user.password;
    return user;
  }
}
