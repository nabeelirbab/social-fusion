import { ConfigEnum, type IJwtConfig } from '@lib/types';
import { registerAs } from '@nestjs/config';

export default registerAs(
  ConfigEnum.JWT_TOKEN,
  (): IJwtConfig => ({
    secret: process.env.JWT_SECRET || 'thisshouldbeasecret',
    expireIn: process.env.JWT_EXPIRES || '365d',
  })
);
