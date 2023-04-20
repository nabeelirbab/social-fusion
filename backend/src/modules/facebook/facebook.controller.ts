import { FacebookConnectDto, FacebookPostDto } from '@lib/dtos';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Headers,
} from '@nestjs/common';

import { Request } from 'express';
import { FacebookService } from './facebook.service';
import { UserService } from '../user/user.service';

@Controller('facebook')
export class FacebookController {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly userService: UserService
  ) {}

  @Post('connect-facebook')
  async connectFacebook(
    @Body() data: FacebookConnectDto,
    @Headers('token') token: string
  ): Promise<any> {
    return await this.facebookService.connectFacebook(data, token);
  }

  @Get('connect-profile-status')
  async connectStatus(@Headers('token') token: string): Promise<any> {
    return await this.facebookService.connectStatus(token);
  }

  @Get('refresh-token')
  async refresh(@Headers('token') token: string): Promise<any> {
    return await this.facebookService.getInfo(token);
  }

  @Get('token-info')
  async getValidation(@Headers('token') token: string): Promise<any> {
    return await this.facebookService.getValidAccessToken(token);
  }

  @Post('create-post')
  async createPost(
    @Headers('token') token: string,
    @Body() { message }: FacebookPostDto
  ) {
    return await this.facebookService.createPost(token);
  }
}
