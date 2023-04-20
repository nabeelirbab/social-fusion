import { HttpService, HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LinkedinController } from './linkedin.controller';
import { LinkedinService } from './linkedin.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Linkedin } from './entities/linkedin.entity';
import { LinkedinChat } from './entities/linkedinchat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Linkedin, LinkedinChat]),
    AuthModule,
    HttpModule,
  ],
  controllers: [LinkedinController],
  providers: [LinkedinService, UserService],
})
export class LinkedinModule {}
