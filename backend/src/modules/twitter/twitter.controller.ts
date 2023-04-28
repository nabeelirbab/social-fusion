import {
  Body,
  Controller,
  Get,
  Query,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get('auth')
  async login(@Req() req: any, @Res() res: Response) {
    this.twitterService.login(req, res);
  }

  @Get('callback')
  async callback(
    @Req() req: any,
    @Query('oauth_token') oauth_token: any,
    @Query('oauth_verifier') oauth_verifier: any,
    @Res() res: Response
  ) {
    return await this.twitterService.validateAndSaveToDB(
      req,
      oauth_token,
      oauth_verifier,
      res
    );
  }
}
