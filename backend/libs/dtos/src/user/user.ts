import { UserStatusEnum, IUser, UserRoleEnum } from '@lib/types';
import { Uuid } from '@lib/utils';

export class UserDto {
  id: string;

  userName: string;

  firstName: string;

  lastName: string;

  email: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
