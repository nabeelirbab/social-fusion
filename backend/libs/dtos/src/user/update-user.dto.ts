import { IUser } from '@lib/types';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  constructor(user: IUser) {
    super(user);
  }
}
