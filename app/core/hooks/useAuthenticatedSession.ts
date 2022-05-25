import {
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useSession } from 'next-auth/react';

import { RefreshContext } from '@/core/components/Session';
import { LoginStatesValues } from '@/core/constants/constants';

export const useAuthenticatedSession = async (
  fn: () => void | (() => void),
  deps: Array<unknown>
) => {
  const isFetchedSession = useRef(false);
  const { status } = useSession();
  const isRefreshing = useContext(RefreshContext);

  useEffect(() => {
    if (
      !isFetchedSession.current &&
      status === LoginStatesValues.AUTHENTICATED &&
      !isRefreshing
    ) {
      isFetchedSession.current = true;

      return fn();
    }

    return undefined;
  }, [
    status,
    isRefreshing,
    ...deps,
  ]);
};
