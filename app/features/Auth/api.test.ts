import { request } from '@/utils/request';
import { makeServerSideRequest } from '@/utils/serverSideRequest';

import {
  makeApi,
  makeServerSideApi,
} from './api';

jest.mock('@/utils/serverSideRequest', () => ({
  makeServerSideRequest: jest.fn(),
}));

describe('Auth/api', () => {
  describe('makeApi', () => {
    it('calls instance.get', () => {
      const instance = {
        get: jest.fn(),
      };

      const api = makeApi(instance as unknown as typeof request);

      api.getUser();
      expect(instance.get).toHaveBeenCalled();
    });
  });

  describe('makeServerSideApi', () => {
    it('creates an api object with a correct token', () => {
      makeServerSideApi('token');
      expect(makeServerSideRequest).toHaveBeenCalledWith('token');
    });
  });
});

