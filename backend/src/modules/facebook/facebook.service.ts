import { Injectable } from '@nestjs/common';
import { Facebook, FacebookApiException } from 'facebook-node-sdk';

@Injectable()
export class FacebookService {
  private facebook: Facebook;

  constructor() {
    this.facebook = new Facebook({
      appId: '156744197330354',
      secret: '529a0009eaec8da0ff639ca890c46e46',
      version: 'v11.0',
    });
  }

  async getAccessToken(code: string): Promise<string> {
    try {
      const { access_token } = await this.facebook.api('oauth/access_token', {
        client_id: this.facebook.options().appId,
        client_secret: this.facebook.options().secret,
        redirect_uri: 'YOUR_REDIRECT_URI',
        code,
      });
      return access_token;
    } catch (error) {
      throw new Error('Could not obtain access token');
    }
  }

  async getProfileData(accessToken: string): Promise<any> {
    try {
      const profile = await this.facebook.api('/me', {
        fields: ['name', 'email', 'picture.type(large)'],
        access_token: accessToken,
      });
      return profile;
    } catch (error) {
      throw new Error('Could not get profile data');
    }
  }
}
