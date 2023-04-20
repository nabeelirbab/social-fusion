import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsNumber,
  IsOptional,
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

export class FacebookPostDto {
  // @IsNotEmpty()
  // @IsEmail()
  // email: string;

  // @IsNotEmpty()
  // @IsString()
  // facebookId: string;

  // @IsNotEmpty()
  // @IsString()
  // accessToken: string;

  // @IsNotEmpty()
  // @IsNumber()
  // expiresIn: number;

  @IsOptional()
  message: any;
}
