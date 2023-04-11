export interface IServerConfigAdmin {
  email: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export interface IServerConfig {
  port: number;
  productName: string;
  backendUrl: string;
  frontendUrl: string;
  authLoginLink: string;
  admin: IServerConfigAdmin;
}

export enum ServerConfigEnum {
  PORT = 'port',
  PRODUCT_NAME = 'productName',
  BACKEND_URL = 'backendUrl',
  FRONTEND_URL = 'frontendUrl',
  AUTH_LOGIN_LINK = 'authLoginLink',
  ADMIN = 'admin',
}
