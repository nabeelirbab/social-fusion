// twitter.module.ts
import { Module } from '@nestjs/common';
// import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { Twitter } from './entities/twitter.entity';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import passport from 'passport';
import { TwitterService } from './twitter.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Twitter]), AuthModule],
  controllers: [TwitterController],
  providers: [TwitterService],
  // exports: [TwitterService],
})
export class TwitterModule {}
