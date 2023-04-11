import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';
import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { ConfigEnum } from '@lib/types';

// default directories
const ENTITIES_DIR = resolve(
  __dirname,
  '../',
  '**',
  'entities',
  '*.entity.{ts,js}'
);

export default registerAs(
  ConfigEnum.TYPEORM,
  (): DataSourceOptions | TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'socialfusion',
    synchronize: true,
    entities: [ENTITIES_DIR],
    autoLoadEntities: true,
  })
);
