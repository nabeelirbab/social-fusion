import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
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
}
