// import { UserDto } from '@lib/dtos';

import { UserDto } from '../user';

export class AuthorizeResponseDto {
  user: UserDto;
  access_token: string;
  constructor(user: UserDto, access_token: string) {
    this.user = user;
    this.access_token = access_token;
  }
}
