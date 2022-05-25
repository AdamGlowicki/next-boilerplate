import {
  createContext,
  ReactChild,
  useEffect,
  useState,
} from 'react';
import {
  getSession,
  signOut,
  useSession,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import { Session as SessionType } from 'next-auth';

import { useAppDispatch } from '@/core/store/store';
import { Nullable } from '@/core/interfaces/common';

import { logout } from '@/features/Auth/store';

import { request } from '@/utils/request';
import { isTokenCloseToExpiry } from '@/utils/jwt';

export const RefreshContext = createContext<boolean>(false);

type SessionProps = {
  children: ReactChild;
};

export const Session = ({ children }: SessionProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    data: session,
  } = useSession();

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false);

  useEffect(() => {
    async function nextGetSession() {
      if (session?.error === 'RefreshAccessTokenError') {
        dispatch(logout());
        signOut();
      }

      if (!session?.refreshToken || !session?.accessToken) {
        request.removeTokens();
      }

      if (session?.accessToken) {
        let newSession: Nullable<SessionType> = session;

        if (isTokenCloseToExpiry(session.accessToken)) {
          setIsRefreshing(true);
          newSession = await getSession();
          setIsRefreshing(false);
        }

        if (newSession?.accessToken) {
          request.setAuthorizationToken(newSession.accessToken);
        }
      }
    }

    nextGetSession();
  }, [
    dispatch,
    session,
    router,
  ]);

  return (
    <RefreshContext.Provider value={isRefreshing}>
      {children}
    </RefreshContext.Provider>
  );
};
