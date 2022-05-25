export enum TokenTypes {
  ACCESS = 'access',
  REFRESH = 'refresh'
}

export enum AuthType {
  CREDENTIALS = 'credentials'
}

export type Token = TokenTypes.REFRESH | TokenTypes.ACCESS;

export interface JWTPayload {
  token_type: Token;
  exp: number;
  jti: string;
  user_id: number;
}

export type LoginRequestPayload = {
  [TokenTypes.ACCESS]: string;
  [TokenTypes.REFRESH]: string;
}

export interface RefreshTokenPayload {
  access: string;
}

export interface CreateTokenPayload {
  access: string;
  refresh: string;
}
