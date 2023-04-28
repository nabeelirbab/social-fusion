import { FacebookController } from './facebook.controller';
// twitter.module.ts
import { Module } from '@nestjs/common';
// import { TwitterService } from './twitter.service';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import passport from 'passport';
import { FacebookService } from './facebook.service';
import { Facebook } from './entities/facebook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Facebook]), AuthModule],
  controllers: [FacebookController],
  providers: [FacebookService],
  // exports: [TwitterService],
})
export class FacebookModule {}
