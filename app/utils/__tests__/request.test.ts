import 'mocks/next-auth/react';
import 'mocks/axios';
import axios from 'axios';
import nextAuth from 'next-auth/react';
import { CustomAxios } from 'tests/types/mocks';

import { UnrestrictedEnpoints } from '@/core/constants/constants';

import {
  getAuthHeader,
  request,
} from '@/utils/request';

const customAxios = axios as CustomAxios;

describe('request.ts - request instance', () => {
  beforeEach(() => {
    request.removeTokens();
  });

  it('is instance available', () => {
    expect(request).toBeDefined();
  });

  it(
    'is setAuthorizationToken() set token and removeTokens() removes it + isAuthorizationTokenSet() returns right value',
    () => {
      expect(request.isAuthorizationTokenSet()).toBe(false);

      request.setAuthorizationToken('test-token');

      expect(request.isAuthorizationTokenSet()).toBe(true);

      request.removeTokens();

      expect(request.isAuthorizationTokenSet()).toBe(false);
    }
  );

  it('is refreshing flag returns right value', () => {
    expect(request.isRefreshing()).toBe(false);

    request.startRefresh();

    expect(request.isRefreshing()).toBe(true);

    request.finishRefresh();

    expect(request.isRefreshing()).toBe(false);
  });

  it('HTTP - is POST methods mocked', async () => {
    customAxios.onPost('/post').replyOnce(200, true);

    const {
      config,
      data,
    } = await request.post(
      '/post',
      { test: true },
      { headers: { test: 'postTest' } }
    );

    expect(config).toMatchObject({
      data: '{"test":true}',
      headers: {
        test: 'postTest',
      },
      url: '/post',
    });
    expect(data).toBe(true);
  });

  it('HTTP - is GET method mocked', async () => {
    customAxios.onGet('/get').replyOnce(200, true);

    const {
      config,
      data,
    } = await request.get('/get', {
      params: { test: 'getTest' },
    });

    expect(config).toMatchObject({
      params: { test: 'getTest' },
      url: '/get',
    });
    expect(data).toBe(true);
  });

  it('HTTP - is PATCH method mocked', async () => {
    customAxios.onPatch('/patch').replyOnce(200, true);

    const {
      data,
      config,
    } = await request.patch(
      '/patch',
      { data: true },
      { headers: { custom: 'patchTest' } }
    );

    expect(config).toMatchObject({
      data: '{"data":true}',
      headers: { custom: 'patchTest' },
      url: '/patch',
    });
    expect(data).toBe(true);
  });

  it('HTTP - is OPTIONS method mocked', async () => {
    customAxios.onOptions('/options').replyOnce(200, true);

    const {
      data,
      config,
    } = await request.options(
      '/options',
      { headers: { custom: 'optionsTest' } }
    );

    expect(config).toMatchObject({
      headers: { custom: 'optionsTest' },
      url: '/options',
    });
    expect(data).toBe(true);
  });

  it('HTTP - is PUT method mocked', async () => {
    customAxios.onPut('/put').replyOnce(200, true);

    const {
      data,
      config,
    } = await request.put(
      '/put',
      { field: true },
      { headers: { custom: 'putTest' } }
    );

    expect(config).toMatchObject({
      data: '{"field":true}',
      headers: { custom: 'putTest' },
      url: '/put',
    });
    expect(data).toBe(true);
  });

  it('HTTP - is DELETE method mocked', async () => {
    customAxios.onDelete('/delete').replyOnce(200, true);

    const {
      config,
      data,
    } = await request.delete(
      '/delete',
      { headers: { custom: 'deleteTest' } }
    );

    expect(config).toMatchObject({
      headers: { custom: 'deleteTest' },
      url: '/delete',
    });
    expect(data).toBe(true);
  });

  it('INTERCEPTORS -is catching request error - standard', async () => {
    customAxios.onGet('/get-error').reply(500, { error: 'General error' });

    try {
      await request.get('/get-error');
    } catch (err: any) {
      expect(err.response.data.error).toBe('General error');
      expect(err.response.status).toBe(500);
    }
  });

  it('INTERCEPTORS - is retrying response', async () => {
    const retryUrl = '/retry-err';

    jest.spyOn(nextAuth, 'getSession').mockResolvedValueOnce({
      accessToken: 'mocked-token',
      expires: '',
      refreshToken: 'mocked-refresh',
    });

    customAxios.onGet(retryUrl)
      .replyOnce(401)
      .onGet(retryUrl)
      .replyOnce(400);
    request.setAuthorizationToken('testing-token');

    try {
      await request.get(retryUrl);
    } catch (err: any) {
      expect(err.response.status).toBe(400);
    }

    const errorRequestCount = customAxios.history.get.filter(req => req.url === retryUrl) || [];

    expect(errorRequestCount.length).toBe(2);
  });

  it('INTERCEPTORS - is parsing error', async () => {
    const parseErrorUrl = '/parse-error';

    customAxios.onGet(parseErrorUrl)
      .replyOnce(401);

    try {
      await request.get(parseErrorUrl);
    } catch (err: any) {
      expect(err.response.status).toBe(401);
      expect(err.response.data).toStrictEqual({ _error: [] });
    }
  });

  it('INTERCEPTORS - is throwing custom error when dont have response', async () => {
    const customErrorUrl = '/custom-error-url';
    const thrownError = new Error('Error do not have a response.');

    customAxios.onGet(customErrorUrl).timeoutOnce();

    await expect(request.get(customErrorUrl)).rejects.toEqual(thrownError);
  });

  it('INTERCEPTORS - is throwing an error when url from UnrestrictedEnpoints', async () => {
    const unrestrictedEndpoint = UnrestrictedEnpoints.CREATE;

    customAxios.onGet(unrestrictedEndpoint)
      .replyOnce(400, {
        custom_fields: 'testing',
        non_field_errors: 'nonErrorField',
      });

    try {
      await request.get(unrestrictedEndpoint);
    } catch (err: any) {
      expect(err.response.data).toMatchObject({
        _error: 'nonErrorField',
        customFields: 'testing',
        nonFieldErrors: 'nonErrorField',
      });
    }
  });
});

describe('request.ts - getAuthHeader', () => {
  it('returns string ready to be used as auth header', () => {
    expect(getAuthHeader('test-token')).toBe(
      'Bearer test-token'
    );
  });
});
