import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Facebook } from './entities/facebook.entity';
import { AuthHelper } from '../auth/auth.helper';

@Injectable()
export class FacebookService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Facebook)
  private readonly fbRepository: Repository<Facebook>;
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  async connectFacebook(
    { facebookId, accessToken }: { facebookId: string; accessToken: string },
    token: string
  ): Promise<any> {
    const decoded = await this.helper.decode(token as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const facebook = new Facebook();
    facebook.facebookId = facebookId;
    facebook.facebookAccessToken = accessToken;
    facebook.user = user;
    user.facebook = facebook;
    await this.userRepository.save(user);
    await this.fbRepository.save(facebook);
    return { success: true };
  }
}
