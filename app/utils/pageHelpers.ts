import { Session } from 'next-auth';
import {
  getSession,
  GetSessionParams,
} from 'next-auth/react';

import { Nullable } from '@/core/interfaces/common';

import { User } from '@/features/Auth/interfaces';
import { makeServerSideApi } from '@/features/Auth/api';

export const getUserFromSession = async (session: Nullable<Session>): Promise<Nullable<User>> => {
  if (session?.accessToken) {
    const { data } = await makeServerSideApi(session.accessToken).getUser();

    return data;
  }

  return null;
};

// making context optional to also make this helper usable on the client side
export const getUserFromContext = async (context?: GetSessionParams) => {
  const session = await getSession(context);

  return getUserFromSession(session);
};
