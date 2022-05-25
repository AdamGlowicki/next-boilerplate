import { User } from '@/features/Auth/interfaces';

import { request } from '@/utils/request';
import { makeServerSideRequest } from '@/utils/serverSideRequest';

export const makeApi = (instance = request) => ({
  getUser: () => instance.get<User>('v1/user/me'),
});

export const api = makeApi();
export const makeServerSideApi = (token: string) => makeApi(makeServerSideRequest(token));
