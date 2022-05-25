import Link from 'next/link';
import {
  signOut,
  useSession,
} from 'next-auth/react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/core/store/store';
import {
  Button,
  StyledButton,
} from '@/core/components/Button';
import { LoginStatesValues } from '@/core/constants/constants';
import { routePaths } from '@/core/constants/routes';

import {
  getUserSelector,
  logout,
} from '@/features/Auth/store';

import {
  LoadingContainer,
  UserStatusTest,
  Wrapper,
} from './User.styles';

export const User = () => {
  const dispatch = useAppDispatch();
  const {
    data: session,
    status,
  } = useSession();

  const userData = useSelector(getUserSelector);
  const isLoading = status === LoginStatesValues.LOADING;

  const logoutAction = () => {
    signOut({ redirect: false });
    dispatch(logout());
  };

  return (
    <Wrapper>
      <LoadingContainer isLoading={isLoading}>
        {session ?
          (
            <>
              <UserStatusTest>
                <small>Signed in</small>
                <br />
                <strong>{userData?.email || userData?.username || ''}</strong>
              </UserStatusTest>
              <p>
                <Button
                  type="button"
                  className="button"
                  onClick={logoutAction}
                >
                  Sign out
                </Button>
              </p>
            </>
          ) :
          (
            <>
              <UserStatusTest>
                You are not signed in
              </UserStatusTest>
              <p>
                <Link
                  href={routePaths.login}
                  passHref
                >
                  <StyledButton
                    as="a"
                    className="buttonPrimary"
                  >
                    Sign in
                  </StyledButton>
                </Link>
              </p>
            </>
          )}
      </LoadingContainer>
    </Wrapper>
  );
};
