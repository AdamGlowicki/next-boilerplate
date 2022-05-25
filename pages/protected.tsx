import { useSession } from 'next-auth/react';

import { LoginStatesValues } from '@/core/constants/constants';

export default function Page() {
  const {
    status,
  } = useSession({
    required: true,
    // Our custom way to handle non-auth users here
    // onUnauthenticated() {}
  });
  const loading = status === LoginStatesValues.LOADING;

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  return (
    <>
      <h1>Protected Page</h1>

      <p>This is the secret... Yea, nothing special.</p>
      <p>
        But implementing the protected route on the server side is also possible.
      </p>
    </>
  );
}
