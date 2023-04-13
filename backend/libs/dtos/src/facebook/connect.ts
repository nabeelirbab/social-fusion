import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsNumber,
} from 'class-validator';
export class FacebookConnectDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  facebookId: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsNumber()
  expiresIn: number;
}
