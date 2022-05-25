export enum LoginStatesValues {
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated'
}

export type LoginStates = LoginStatesValues.AUTHENTICATED |
  LoginStatesValues.LOADING |
  LoginStatesValues.UNAUTHENTICATED;

export enum UnrestrictedEnpoints {
  CREATE = 'v1/auth/jwt/create/',
  REFRESH = 'v1/auth/jwt/refresh/',
}

export enum ThemeDirection {
  RTL = 'rtl',
  LTR = 'ltr'
}
