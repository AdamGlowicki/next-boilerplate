import { AxiosRequestConfig } from 'axios';

import {
  makeServerSideRequest,
  RequestMethods,
} from '@/utils/serverSideRequest';
import { Request } from '@/utils/request';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      request: {
        eject: jest.fn(),
        use: jest.fn(),
      },
      response: {
        eject: jest.fn(),
        use: jest.fn(),
      },
    },
    post: jest.fn(),
  })),
}));

const token = 'mock-token';
const expectedConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const configToMerge: AxiosRequestConfig = { baseURL: 'test' };
const expectedMergedConfig: AxiosRequestConfig = {
  ...configToMerge,
  ...expectedConfig,
};

const request = new Request();
const mockedRequest = new Request();
const mockedSsrRequest = makeServerSideRequest(token, mockedRequest);

/*
  This function is needed because the serverSideRequest adds proxies to the called functions.
  The proxy needs to access the function.length attribute, but when mocking the function in jest,
  we don't really proxy the original function, but the jest.fn() or a jest spy. This fails due to
  jest implementation details (the function.length is always 0), so we need to override it manually
  for the proxies to work correctly.
*/

const defineProxiedFunctionLength = (obj: jest.SpyInstance, method: RequestMethods) => {
  Object.defineProperty(obj, 'length', { value: request[method].length });
};

const spyWithLength = (fn: Request, method: RequestMethods) => {
  const spy = jest.spyOn(fn, method);

  defineProxiedFunctionLength(spy, method);

  return spy;
};

describe('serverSideRequest.ts', () => {
  describe('makeServerSideRequest function', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('does not alter the arguments of methods not responsible for http requestes', () => {
      const spy = jest.spyOn(mockedRequest, 'setIsRefresh');

      Object.defineProperty(spy, 'length', { value: 1 });

      mockedSsrRequest.setIsRefresh(true);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(true);
    });

    it('does not modify anything if the token is falsy', () => {
      const requestWithoutToken = makeServerSideRequest(undefined, mockedRequest);
      const spy = spyWithLength(mockedRequest, RequestMethods.post);

      requestWithoutToken.post('url');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('url');
    });

    describe('passes the provided token when there is no config provided', () => {
      it('works for 2-argument methods (get)', () => {
        const spy = spyWithLength(mockedRequest, RequestMethods.get);

        mockedSsrRequest.get('url');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('url', expectedConfig);
      });

      it('works for 3-argument methods (post)', () => {
        const spy = spyWithLength(mockedRequest, RequestMethods.post);

        mockedSsrRequest.post('url');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('url', undefined, expectedConfig);
      });
    });

    describe('inserts the provided token into the provided config', () => {
      it('works for 2-argument methods (get)', () => {
        const spy = spyWithLength(mockedRequest, RequestMethods.get);

        mockedSsrRequest.get('url', configToMerge);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('url', expectedMergedConfig);
      });

      it('works for 3-argument methods (post)', () => {
        const spy = spyWithLength(mockedRequest, RequestMethods.post);

        mockedSsrRequest.post('url', {}, configToMerge);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('url', {}, expectedMergedConfig);
      });
    });
  });
});
