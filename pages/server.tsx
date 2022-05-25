import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { useSelector } from 'react-redux';

import {
  useAppDispatch,
  wrapper,
} from '@/core/store/store';
import { Nullable } from '@/core/interfaces/common';

import { User } from '@/features/Auth/interfaces';
import {
  getUserSelector,
  setUser,
} from '@/features/Auth/store';

import { getUserFromSession } from '@/utils/pageHelpers';

type PropsType = {
  session: Nullable<Session>;
  user: User;
};

function Page({
  session,
  user,
}: PropsType) {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  // This is possible because of the shared context configured in `_app.js` that
  // is used by `useSession()`.
  const dispatch = useAppDispatch();

  const userData = useSelector(getUserSelector);

  useEffect(() => {
    if (!userData) {
      dispatch(setUser(user));
    }
  }, []);

  return (
    <>
      <h1>
        Server Side Rendering
      </h1>
      <p>
        This page uses the universal
        {' '}
        <strong>getSession()</strong>
        {' '}
        method in
        {' '}
        <strong>getServerSideProps()</strong>
        .
      </p>
      <p>
        Using
        {' '}
        <strong>getSession()</strong>
        {' '}
        in
        {' '}
        <strong>getServerSideProps()</strong>
        {' '}
        is the recommended approach if you need to
        support Server Side Rendering with authentication.
      </p>
      <p>
        The advantage of Server Side Rendering is this page does not require client side JavaScript.
      </p>
      <p>
        The disadvantage of Server Side Rendering is that this page is slower to render.
      </p>

      {session?.accessToken && (
        <h2>
          User is authenticated
        </h2>
      )}
    </>
  );
}

// Export the `session` prop to use sessions with Server Side Rendering
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  () => async context => {
    const session = await getSession(context);
    let user: Nullable<User> = null;

    try {
      user = await getUserFromSession(session);
    } catch (error) {
      return {
        redirect: {
          destination: '/404',
          permanent: true,
        },
        // or use `notFound: true` to only render the /404 page without redirect
      };
    }

    return {
      props: {
        session,
        user,
      },
    };
  }
);

export default Page;
