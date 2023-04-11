import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
export class LoginRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7, {
    message: `Password must be at least 7 characters long`,
  })
  password: string;
}
