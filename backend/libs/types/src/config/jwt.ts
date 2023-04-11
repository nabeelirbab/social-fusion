export interface IJwtConfig {
  secret: string
  expireIn: string
}

export enum JwtConfigEnum {
  SECRET = 'secret',
  EXPIRE_IN = 'expireIn',
}
