import { Controller, Get, Query, Req } from '@nestjs/common';

import { Request } from 'express';
import { FacebookService } from './facebook.service';
import { UserService } from '../user/user.service';

@Controller()
export class FacebookController {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly usersService: UserService
  ) {}

  @Get('/auth/facebook')
  async authFacebook(@Query('code') code: string, @Req() req: Request) {
    const accessToken = await this.facebookService.getAccessToken(code);
    const profileData = await this.facebookService.getProfileData(accessToken);
    const user = await this.usersService.createOrUpdateUser(profileData);
    // Store user data in session or JWT token
    return { user };
  }

  @Get('/facebook-login-button')
  generateFacebookLoginButton() {
    const loginButtonHtml = `
      <fb:login-button 
        scope="public_profile,email" 
        onlogin="checkLoginState();">
      </fb:login-button>
    `;
    return loginButtonHtml;
  }
}
