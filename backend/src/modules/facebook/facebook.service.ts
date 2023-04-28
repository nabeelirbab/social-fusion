import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Facebook } from './entities/facebook.entity';
import { AuthHelper } from '../auth/auth.helper';
import { FacebookConnectDto } from '@lib/dtos';
import axios from 'axios';
import * as FB from 'fb';
// const login = require('facebook-chat-api');
// import facebookLogin from 'ts-messenger-api';
const command = require('fb-chat-command');

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
    console.log(appId, appSecret);
    console.log('here');
    const fbProfile = await user.facebook;

    if (!fbProfile) {
      throw new HttpException(
        'User does not have a Facebook profile.',
        HttpStatus.NOT_FOUND
      );
    }

    try {
      console.log('kkkkk', user.facebook.facebookAccessToken);
      const response = await axios.get(
        `https://graph.facebook.com/v9.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${user.facebook.facebookAccessToken}`
      );
      console.log('11', response.data);
      const { access_token, expires_in } = response.data;
      const accessTokenExpiresAt = new Date(Date.now() + expires_in * 1000);
      console.log('dddddd');
      // Update the access token and expiration date
      fbProfile.facebookAccessToken = access_token;
      fbProfile.accessTokenExpiresAt = accessTokenExpiresAt;
      const fb = await this.fbRepository.save(fbProfile);
      return fb.facebookAccessToken;
    } catch (error) {
      if (error.response && error.response.data) {
        // console.log('ssss', error);
        throw new HttpException(
          error.response.data.error.message,
          HttpStatus.BAD_REQUEST
        );
      } else {
        console.log();
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
    const fbProfile = user?.facebook;
    const currentToken = fbProfile?.facebookAccessToken;
    const accessTokenExpiresAt = fbProfile.accessTokenExpiresAt;
    console.log(accessTokenExpiresAt);
    // const response = await axios.get(
    //   `https://graph.facebook.com/v13.0/me?access_token=${currentToken}`
    // );
    const response = await this.debugToken(
      currentToken,
      '156744197330354',
      '529a0009eaec8da0ff639ca890c46e46'
    );
    if (response.error.code === 190) {
      // Token expired
      return await this.refreshFacebookAccessToken(
        user,
        `${process.env.APP_ID}` || '156744197330354',
        `${process.env.APP_SECRET}` || '529a0009eaec8da0ff639ca890c46e46'
      );
    }
    console.log(currentToken);
    return currentToken;
  }

  async createPost(token: string): Promise<any> {
    const decoded = await this.helper.decode(token as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const existingProfile = await this.userRepository.findOne({
      where: { email: user.email },
      relations: ['facebook'],
    });
    // If the access token is expired, refresh it
    // const access_token = await this.getValidAccessToken(token);
    try {
      // console.log(access_token);
      const response = await axios.get(
        `https://graph.facebook.com/v9.0/me/friends?access_token=${existingProfile.facebook.facebookAccessToken}`
      );
      console.log(response.data.data);
      // return response.data.data;
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
      // FB.setAccessToken(access_token);
      // var body = 'My first post using facebook-node-sdk';
      // FB.api('me/feed', 'post', { message: body }, function (res) {
      //   if (!res || res.error) {
      //     console.log(!res ? 'error occurred' : res.error);
      //     return;
      //   }
      //   console.log('Post Id: ' + res.id);
      // });
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
  async testt() {
    // login(
    //   { email: 'umar.coderzhunt@gmail.com', password: 'password1234' },
    //   (err, api) => {
    //     if (err) return console.error(err);

    //     // var yourID = '000000000000000';
    //     // var msg = 'Hey!';
    //     // api.sendMessage(msg, yourID);
    //     console.log(api);
    //   }
    // );
    // Initialize the chat command first
    // you can also pass option example command prefix
    command.init({ prefix: '/' });

    command.add(
      (body, event, api) => {
        console.log(body);
      },
      { prefix: '/', command: 'help' }
    );

    // also you can get all command registered
    command.list();
    // const api = await facebookLogin({
    //   email: 'umar.coderzhunt@gmail.com',
    //   password: 'password1234',
    // });

    // // const friends = await api.getFriendsList();

    // await api.listen();
    // console.log(api);
    // await api.sendMessage({ body: 'Hi' }, friends[0].id);
  }

  async debugToken(accessToken, appId, appSecret) {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v9.0/debug_token?input_token=${accessToken}&access_token=${appId}|${appSecret}`
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
