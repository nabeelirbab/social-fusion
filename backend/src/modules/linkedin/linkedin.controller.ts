import { FacebookConnectDto, FacebookPostDto } from '@lib/dtos';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Headers,
  Res,
} from '@nestjs/common';
import axios from 'axios';

import { Request } from 'express';
import { LinkedinService } from './linkedin.service';
import { UserService } from '../user/user.service';

@Controller('linkedin')
export class LinkedinController {
  constructor(
    private readonly linkedinService: LinkedinService,
    private readonly userService: UserService
  ) {}

  @Post('post-article')
  async postArticle(
    @Res() res,
    @Body('accessToken') accessToken: string,
    @Body('article') article: string
  ) {
    return this.linkedinService.postArticle(res, accessToken, article);
  }

  @Post('exchange-token')
  async exchangeToken(
    @Body('code') code: string,
    @Body('redirectUri') redirectUri: string,
    @Body('token') token: string,
    @Res() res
  ) {
    return this.linkedinService.exchangeToken(code, redirectUri, token, res);
  }

  @Get('profile')
  async getProfile(@Res() res, @Headers('accessToken') accessToken: string) {
    return await this.linkedinService.getProfile(res, accessToken);
  }

  @Get('posts')
  async getPosts(@Headers('accessToken') accessToken: string) {
    return await this.linkedinService.getPosts(accessToken);
  }

  @Get('connect-profile-status')
  async connectStatus(@Headers('token') token: string): Promise<any> {
    return await this.linkedinService.connectStatus(token);
  }

  @Get('get-profile')
  async profile(@Headers('token') token: string): Promise<any> {
    return await this.linkedinService.getSavedProfile(token);
  }
}
