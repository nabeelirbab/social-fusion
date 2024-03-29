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
  Param,
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

  @Post('create-chat')
  async createChat(@Headers('token') token: string) {
    return await this.linkedinService.createChat(token);
  }

  @Post('connect')
  async test(
    @Headers('token') accessToken: string,
    @Body('userName') userName: string,
    @Body('password') password: string
  ) {
    return await this.linkedinService.login(accessToken, userName, password);
  }

  @Get('verify')
  async verify(@Headers('token') token: string) {
    return await this.linkedinService.getUserAuthVerified(token);
  }

  @Get('find-connection')
  async findConnection(
    @Query('name') name: string,
    @Headers('token') accessToken: string
  ) {
    return await this.linkedinService.searchConnections(name, accessToken);
  }

  @Get('find-chats')
  async findChats(@Headers('token') accessToken: string) {
    return await this.linkedinService.getAllChats(accessToken);
  }

  @Get('find-chat/:id')
  async find(
    @Param('id') profileId: string,
    @Headers('token') accessToken: string
  ) {
    return await this.linkedinService.getChatByProfileId(
      profileId,
      accessToken
    );
  }

  @Post('send-chat/:id')
  async sendMessage(
    @Param('id') profileId: string,
    @Headers('token') accessToken: string,
    @Body('msg') msg: string
  ) {
    return await this.linkedinService.sendMessage(profileId, accessToken, msg);
  }

  @Get('video/:id')
  async getvideo(
    // @Body('urn') urn: string,
    @Param('id') urn: string,
    @Res() res
  ) {
    console.log(urn);
    // console.log(urn);
    return await this.linkedinService.getVideo(urn, res);
  }
}
