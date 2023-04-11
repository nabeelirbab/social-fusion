import { version } from 'package.json';
import { registerAs } from '@nestjs/config';
import { ConfigEnum } from '@lib/types';

export default registerAs(ConfigEnum.SWAGGER, () => ({
  title: process.env.SWAGGER_TITLE || 'Social Fusion',
  description:
    process.env.SWAGGER_DESCRIPTION || "Social Fusion Rest api's documentation",
  version: version || '1.0.0',
}));
