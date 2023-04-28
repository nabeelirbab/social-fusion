import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Facebook } from '../facebook/entities/facebook.entity';
import { Linkedin } from '../linkedin/entities/linkedin.entity';
import { LinkedinChat } from '../linkedin/entities/linkedinchat.entity';
import { Twitter } from '../twitter/entities/twitter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Facebook, Linkedin, LinkedinChat, Twitter]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
