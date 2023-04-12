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
    {
      facebookId,
      accessToken,
      email,
    }: { facebookId: string; accessToken: string; email: string },
    token: string
  ): Promise<any> {
    const decoded = await this.helper.decode(token as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const existingProfile = await this.userRepository.findOne({
      where: { email: user.email },
      relations: ['facebook'],
    });
    // console.log(existingProfile);
    if (existingProfile.facebook)
      throw new HttpException('Already Connected!', HttpStatus.CONFLICT);
    const facebook = new Facebook();
    facebook.facebookId = facebookId;
    facebook.facebookAccessToken = accessToken;
    facebook.user = user;
    facebook.email = email;
    user.facebook = facebook;
    await this.userRepository.save(user);
    await this.fbRepository.save(facebook);
    return { success: true };
  }
  async connectStatus(token: string) {
    try {
      const decoded = await this.helper.decode(token as string); // verify access token and get user from db
      const user = decoded ? await this.helper.validateUser(decoded) : null;
      if (!user) {
        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
      }
      const existingProfile = await this.userRepository.findOne({
        where: { email: user.email },
        relations: ['facebook'],
      });
      if (existingProfile.facebook) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      throw new HttpException('token not valid!', HttpStatus.BAD_REQUEST);
    }
  }
}
