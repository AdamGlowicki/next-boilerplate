import { JWT } from 'next-auth/jwt';
import jwtDecode from 'jwt-decode';
import { AxiosPromise } from 'axios';

import {
  JWTPayload,
  RefreshTokenPayload,
} from '@/features/Auth/interfaces/auth';

import { request } from '@/utils/request';

export function isTokenCloseToExpiry(token: string) {
  if (!token) return false;

  const { exp } = jwtDecode<JWTPayload>(token);

  const CLOSE_TO_EXPIRY_MINUTES = 15;
  const MINUTES_IN_SECONDS = CLOSE_TO_EXPIRY_MINUTES * 60;

  return (exp - Math.floor(Date.now() / 1000)) < MINUTES_IN_SECONDS;
}

export function isTokenExpired(token: string) {
  if (!token) return false;

  const { exp } = jwtDecode<JWTPayload>(token);

  return exp - Math.floor(Date.now() / 1000) <= 0;
}

// https://github.com/nextauthjs/next-auth/issues/2071
// temporary fix for the issue above
export const tokenRefreshCache: { [key: string]: AxiosPromise<RefreshTokenPayload> } = {};

export const refreshAccessToken = async (token: JWT) => {
  const { refreshToken } = token;

  try {
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const refreshTokenPromise =
      tokenRefreshCache[refreshToken] ??
      request.post<RefreshTokenPayload>(
        'v1/auth/jwt/refresh/', { refresh: refreshToken }
      );

    if (!tokenRefreshCache[refreshToken]) {
      tokenRefreshCache[refreshToken] = refreshTokenPromise;
    }

    const { data } = await refreshTokenPromise;

    return {
      ...token,
      accessToken: data.access,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  } finally {
    if (refreshToken) {
      delete tokenRefreshCache[refreshToken];
    }
  }
};
