export interface IMailConfig {
  MAIL_HOST: string
  MAIL_USER: string
  MAIL_PASSWORD: string
  MAIL_FROM: string
}

export enum mailConfigEnum {
  MAIL_HOST = 'MAIL_HOST',
  MAIL_USER = 'MAIL_USER',
  MAIL_PASSWORD = 'MAIL_PASSWORD',
  MAIL_FROM = 'MAIL_FROM',
}
