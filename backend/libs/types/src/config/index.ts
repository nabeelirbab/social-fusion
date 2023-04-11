export * from './swagger';
export * from './server';
export * from './mail';
export * from './jwt';

export enum ConfigEnum {
  TYPEORM = 'typeorm',
  SERVER = 'server',
  SWAGGER = 'swagger',
  MAIL = 'MAIL',
  JWT_TOKEN = 'jwtToken',
}
