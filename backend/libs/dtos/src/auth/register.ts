import { UserRoleEnum, UserStatusEnum, type IUser } from '@lib/types';
import { ApiProperty } from '@nestjs/swagger';

import { Trim } from 'class-sanitizer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserRegisterRequestDto implements IUser {
  @Trim()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'john.smith@demo.com',
    description: 'Email of the user',
  })
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7, {
    message: 'Password must be at least 7 characters long',
  })
  @ApiProperty({
    example: 'password',
    description: 'Password for user. Must be 7 characters long.',
  })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'firstName',
    description: 'firstName for user.',
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'lastName',
    description: 'lastName for user.',
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'userName',
    description: 'username for user.',
  })
  userName?: string;
}
