import { MailModule } from './../mail/mail.module';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum, IJwtConfig } from '@lib/types';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret:
          process.env.JWT_SECRET ||
          config.get<IJwtConfig>(ConfigEnum.JWT_TOKEN).secret,
        signOptions: {
          expiresIn:
            process.env.JWT_EXPIRES ||
            config.get<IJwtConfig>(ConfigEnum.JWT_TOKEN).expireIn,
        },
      }),
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, AuthHelper, JwtStrategy],
  exports: [AuthHelper],
})
export class AuthModule {}
