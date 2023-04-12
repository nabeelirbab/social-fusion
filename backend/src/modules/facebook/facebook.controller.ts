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
}
