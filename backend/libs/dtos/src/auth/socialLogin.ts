import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SocialProviderEnum } from '@lib/types';

export class SocialLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  @IsEnum(SocialProviderEnum)
  socialProvider: SocialProviderEnum;
}
