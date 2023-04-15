import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Facebook } from './entities/facebook.entity';
import { AuthHelper } from '../auth/auth.helper';
import { FacebookConnectDto } from '@lib/dtos';
import axios from 'axios';
import * as FB from 'fb';

@Injectable()
export class FacebookService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Facebook)
  private readonly fbRepository: Repository<Facebook>;
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  async connectFacebook(
    { facebookId, accessToken, email, expiresIn }: FacebookConnectDto,
    token: string
  ): Promise<any> {
    const decoded = await this.helper.decode(token as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const existingProfile = await this.userRepository.findOne({
      where: { email: user.email },
      relations: ['facebook'],
    });
    if (existingProfile.facebook)
      throw new HttpException('Already Connected!', HttpStatus.CONFLICT);
    const accessTokenExpiresAt = new Date(Date.now() + expiresIn * 1000);
    const facebook = new Facebook();
    facebook.facebookId = facebookId;
    facebook.facebookAccessToken = accessToken;
    facebook.user = user;
    facebook.email = email;
    facebook.accessTokenExpiresAt = accessTokenExpiresAt;
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

  async refreshFacebookAccessToken(
    user: User,
    appId: string,
    appSecret: string
  ) {
    const fbProfile = await user.facebook;

    if (!fbProfile) {
      throw new HttpException(
        'User does not have a Facebook profile.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      const response = await axios.get(
        'https://graph.facebook.com/v13.0/oauth/access_token',
        {
          params: {
            grant_type: 'fb_exchange_token',
            client_id: appId,
            client_secret: appSecret,
            fb_exchange_token: fbProfile.facebookAccessToken,
          },
        }
      );

      const { access_token, expires_in } = response.data;
      const accessTokenExpiresAt = new Date(Date.now() + expires_in * 1000);
      // Update the access token and expiration date
      fbProfile.facebookAccessToken = access_token;
      fbProfile.accessTokenExpiresAt = accessTokenExpiresAt;
      const fb = await this.fbRepository.save(fbProfile);
      return fb.facebookAccessToken;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new HttpException(
          error.response.data.error.message,
          HttpStatus.BAD_REQUEST
        );
      } else {
        throw new HttpException(
          'An error occurred while refreshing the access token',
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }

  async getInfo(token) {
    const decoded = await this.helper.decode(token as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    this.refreshFacebookAccessToken(
      user,
      `${process.env.APP_ID}`,
      `${process.env.APP_SECRET}`
    );
  }

  async getValidAccessToken(token: string) {
    const decoded = await this.helper.decode(token as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const fbProfile = user.facebook;
    const currentToken = fbProfile.facebookAccessToken;
    const response = await axios.get(
      `https://graph.facebook.com/v13.0/me?access_token=${currentToken}`
    );
    if (response.data.error && response.data.error.code === 190) {
      // Token expired
      return this.refreshFacebookAccessToken(
        user,
        `${process.env.APP_ID}` || '156744197330354',
        `${process.env.APP_SECRET}` || '529a0009eaec8da0ff639ca890c46e46'
      );
    }
    return currentToken;
  }

  async createPost(token: string): Promise<any> {
    const decoded = await this.helper.decode(token as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const fbProfile = await user.facebook;
    // If the access token is expired, refresh it
    const access_token = await this.getValidAccessToken(token);

    try {
      // const response = await axios.post(
      //   `https://graph.facebook.com/${fbProfile.facebookId}/feed`,
      //   {
      //     message,
      //   },
      //   {
      //     params: {
      //       access_token,
      //     },
      //   }
      // );

      // return response.data;
      FB.setAccessToken(access_token);
      var body = 'My first post using facebook-node-sdk';
      FB.api('me/feed', 'post', { message: body }, function (res) {
        if (!res || res.error) {
          console.log(!res ? 'error occurred' : res.error);
          return;
        }
        console.log('Post Id: ' + res.id);
      });
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle other errors from Facebook API
        throw new HttpException(
          error.response.data.error.message,
          HttpStatus.BAD_GATEWAY
        );
      } else {
        throw new HttpException(
          'An error occurred while creating the post',
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }
}
