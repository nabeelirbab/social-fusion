import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OAuth } from 'oauth';
import { Session } from 'express-session';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { AuthHelper } from '../auth/auth.helper';
import * as Twit from 'twit';
import { Twitter } from './entities/twitter.entity';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TwitterService {
  private oauth: OAuth;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Twitter)
    private readonly twitterRepository: Repository<Twitter>,
    @Inject(AuthHelper)
    private readonly helper: AuthHelper
  ) {
    this.oauth = new OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      'mXnnohUKJdLrS37NrVz1IEBdy',
      'SzexphLD2Wf3gUdrmEWKXr3naFnEkWEDqnTvbyDJqjfpMlMWsM',
      '1.0A',
      'http://localhost:3300/api/twitter/callback',
      'HMAC-SHA1'
    );
  }

  getRequestToken(): Promise<{ oauthToken: any; oauthTokenSecret: any }> {
    return new Promise((resolve, reject) => {
      this.oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret) => {
        if (error) {
          reject(error);
        } else {
          resolve({ oauthToken, oauthTokenSecret });
        }
      });
    });
  }

  getAccessToken(
    oauthToken: string,
    oauthTokenSecret: string,
    oauthVerifier: string
  ): Promise<{ accessToken: string; accessTokenSecret: string }> {
    return new Promise((resolve, reject) => {
      this.oauth.getOAuthAccessToken(
        oauthToken,
        oauthTokenSecret,
        oauthVerifier,
        (error, accessToken, accessTokenSecret) => {
          if (error) {
            reject(error);
          } else {
            resolve({ accessToken, accessTokenSecret });
          }
        }
      );
    });
  }
  public async validateAndSaveToDB(req, oauth_token, oauth_verifier, res) {
    try {
      const { accessToken, accessTokenSecret } = await this.getAccessToken(
        oauth_token as any,
        req.session.oauthTokenSecret,
        oauth_verifier as any
      );
      const token = req.session.accessToken;
      const decoded = await this.helper.decode(token as string); // verify access token and get user from db
      // console.log(decoded);
      const user = decoded ? await this.helper.validateUser(decoded) : null;
      if (!user)
        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
      const existingProfile = await this.userRepository.findOne({
        where: { email: user.email },
        relations: ['twitter'],
      });
      // if (existingProfile.twitter)
      //   throw new HttpException('Already Connected!', HttpStatus.CONFLICT);
      const userInfo = await this.getUserInfo(accessToken, accessTokenSecret);
      const userObject = {
        id: userInfo.id_str,
        imageUrl: userInfo.profile_image_url_https,
        username: userInfo.screen_name,
        email: userInfo.email, // Make sure you have the "Request email addresses from users" permission
        accessToken,
        accessTokenSecret,
      };
      const twitter = new Twitter();
      twitter.accessToken = userObject.accessToken;
      twitter.accessTokenSecret = userObject.accessTokenSecret;
      twitter.email = userObject.email;
      twitter.twitterId = userObject.id;
      twitter.userName = userObject.username;
      twitter.image = userObject.imageUrl;
      user.twitter = twitter;
      // await this.userRepository.save(user);
      // await this.twitterRepository.save(twitter);
      await this.getUserMessages(accessToken, accessTokenSecret);

      res.redirect('http://localhost:3000/addProfile');
    } catch (error) {
      console.error('Error getting OAuth access token:', error);
      res.status(500).send('Error getting OAuth access token');
    }
  }

  async login(req, res) {
    try {
      const { oauthToken, oauthTokenSecret } = await this.getRequestToken();
      req.session.oauthToken = oauthToken;
      req.session.oauthTokenSecret = oauthTokenSecret;
      req.session.accessToken = req?.query?.myAccessToken;
      const token = req.session.accessToken;
      const decoded = await this.helper.decode(token as string); // verify access token and get user from db
      // console.log(decoded);
      const user = decoded ? await this.helper.validateUser(decoded) : null;
      if (!user)
        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
      res.redirect(
        `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`
      );
    } catch (error) {
      console.error('Error getting OAuth request token:', error);
      res.status(500).send('Error getting OAuth request token');
    }
  }

  async getUserInfo(
    accessToken: string,
    accessTokenSecret: string
  ): Promise<any> {
    const twit = this.getTwitInstance(accessToken, accessTokenSecret);

    return new Promise((resolve, reject) => {
      twit.get(
        'account/verify_credentials',
        { skip_status: true, include_email: true },
        (err, data, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  // src/twitter/twitter.service.ts

  private getTwitInstance(
    accessToken: string,
    accessTokenSecret: string
  ): Twit {
    return new Twit({
      consumer_key: 'mXnnohUKJdLrS37NrVz1IEBdy',
      consumer_secret: 'SzexphLD2Wf3gUdrmEWKXr3naFnEkWEDqnTvbyDJqjfpMlMWsM',
      access_token: accessToken,
      access_token_secret: accessTokenSecret,
      timeout_ms: 60 * 1000, // optional HTTP request timeout (1 minute)
      strictSSL: true, // optional - requires SSL certificates to be valid
    });
  }

  // src/twitter/twitter.service.ts

  async getUserMessages(
    accessToken: string,
    accessTokenSecret: string
  ): Promise<any> {
    const twit = await this.getTwitInstance(accessToken, accessTokenSecret);
    return new Promise((resolve, reject) => {
      twit.get('direct_messages/events/list', {}, (err, data, response) => {
        if (err) {
          reject(err);
        } else {
          console.log(data);
          resolve(data);
        }
      });
    });
  }

  // async getUserTweets(
  //   // accessToken: string,
  //   // accessTokenSecret: string
  // ): Promise<any> {
  //     const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAEsVmwEAAAAAewcSvLSLj%2BlEM6VZ49LUYHBZ4WY%3D2ph0RHG558sk9reK9GN3gn0ZKs8gSUyWcgOd7Q7rcbm26Gql5n');

  //   // Create a new TwitterApi instance with user's access token and access token secret
  //   // const client = new TwitterApi({
  //   //   appKey: 'mXnnohUKJdLrS37NrVz1IEBdy',
  //   //   appSecret: 'SzexphLD2Wf3gUdrmEWKXr3naFnEkWEDqnTvbyDJqjfpMlMWsM',
  //   //   accessToken: accessToken,
  //   //   accessSecret: accessTokenSecret,
  //   // });

  //   // Make the API request to get the user's Tweets
  //   try {
  //     const result = await client.v1.('1615633708169437185');
  //     console.log(result.data);
  //     return result.data;
  //   } catch (error) {
  //     console.error('Error getting user Tweets:', error);
  //     if (error.data && error.data.errors) {
  //       console.error('Twitter API errors:', error.data.errors);
  //     }
  //     throw error;
  //   }
  // }
}
