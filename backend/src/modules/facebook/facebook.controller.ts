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

@Controller()
export class FacebookController {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly userService: UserService
  ) {}

  @Post('connect-facebook')
  async connectFacebook(
    @Body() data: any,
    @Headers('token') token: string
  ): Promise<any> {
    return await this.facebookService.connectFacebook(data, token);
  }
}
