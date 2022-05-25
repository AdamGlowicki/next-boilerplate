import MockDate from 'mockdate';
import '../__mocks__/request';
import { AxiosPromise } from 'axios';

import { RefreshTokenPayload } from '@/features/Auth/interfaces';

import {
  isTokenCloseToExpiry,
  isTokenExpired,
  refreshAccessToken,
  tokenRefreshCache,
} from '@/utils/jwt';

// Example toekn with exp at: 1631806319
const exampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbzIucGwiLCJpYXQiOjE2MzE4MDYyNTksImV4cCI6MTYzMTgwNjMxOX0.ERkyB9cc3CKzl4-THV0HnHhLpNvyVGJuO6yBF9Uzo4g';
const expiryDate = 1631806319 * 1000;

describe('jwt.ts - isTokenCloseToExpiry', () => {
  it('is return false when param is empty', () => {
    expect(isTokenCloseToExpiry('')).toBe(false);
  });

  it('old token returns true', () => {
    const tokenDate = new Date(expiryDate);

    MockDate.set(tokenDate.setDate(tokenDate.getDate() + 1));

    expect(isTokenCloseToExpiry(exampleToken)).toBe(true);
  });

  it('10 min before token expiry returns true', () => {
    const tokenDate = new Date(expiryDate);

    MockDate.set(tokenDate.setMinutes(tokenDate.getMinutes() - 10));

    expect(isTokenCloseToExpiry(exampleToken)).toBe(true);
  });

  it('fresh token returns false', () => {
    const tokenDate = new Date(expiryDate);

    MockDate.set(tokenDate.setDate(tokenDate.getDate() - 1));

    expect(isTokenCloseToExpiry(exampleToken)).toBe(false);
  });
});

describe('jwt.ts - isTokenExpired', () => {
  it('is return false when param is empty', () => {
    expect(isTokenExpired('')).toBe(false);
  });

  it('old token returns true', () => {
    const tokenDate = new Date(expiryDate);

    MockDate.set(tokenDate.setDate(tokenDate.getDate() + 1));

    expect(isTokenExpired(exampleToken)).toBe(true);
  });

  it('10 min before token expiry returns false', () => {
    const tokenDate = new Date(expiryDate);

    MockDate.set(tokenDate.setMinutes(tokenDate.getMinutes() - 10));

    expect(isTokenExpired(exampleToken)).toBe(false);
  });

  it('fresh token returns false', () => {
    const tokenDate = new Date(expiryDate);

    MockDate.set(tokenDate.setDate(tokenDate.getDate() - 1));

    expect(isTokenExpired(exampleToken)).toBe(false);
  });
});

describe('jwt.ts - refreshAccessToken', () => {
  it('empty refresh token returns error field', async () => {
    const response = await refreshAccessToken({
      accessToken: null,
      refreshToken: null,
    });

    expect(response).toEqual(expect.objectContaining({
      error: 'RefreshAccessTokenError',
    }));
  });

  it('defined refresh token returns new pair of token', async () => {
    const response = await refreshAccessToken({
      accessToken: '',
      refreshToken: 'refresh',
    });

    expect(response).toEqual(expect.objectContaining({
      accessToken: 'new-access',
    }));
  });

  it('saves the token to the cache if it is not already there', () => {
    const promise = refreshAccessToken({
      accessToken: '',
      refreshToken: 'testtoken',
    });

    expect(tokenRefreshCache).toMatchObject({
      testtoken: promise,
    });

    delete tokenRefreshCache.testtoken;
  });

  it('does not save the token to the cache if it is already there', () => {
    const firstPromise = new Promise(resolve => resolve({ data: { access: 'test' } })) as unknown as AxiosPromise<RefreshTokenPayload>;

    tokenRefreshCache.testtoken2 = firstPromise;

    refreshAccessToken({
      accessToken: '',
      refreshToken: 'testtoken2',
    });

    expect(tokenRefreshCache).toMatchObject({
      testtoken2: firstPromise,
    });
  });
});
