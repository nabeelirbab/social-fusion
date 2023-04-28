import { Module } from '@nestjs/common';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Facebook } from './entities/facebook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Facebook]), AuthModule],
  controllers: [FacebookController],
  providers: [FacebookService, UserService],
})
export class FacebookModule {}
