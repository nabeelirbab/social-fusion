import { ConfigEnum, type IMailConfig } from '@lib/types';
import { registerAs } from '@nestjs/config';

export default registerAs(
  ConfigEnum.MAIL,
  (): IMailConfig => ({
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_FROM: process.env.MAIL_FROM,
  })
);
