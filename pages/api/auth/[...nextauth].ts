// disabling sort keys as we want to preserve the original config order
/* eslint-disable sort-keys */

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { routePaths } from '@/core/constants/routes';
import { UnrestrictedEnpoints } from '@/core/constants/constants';

import { CreateTokenPayload } from '@/features/Auth/interfaces';

import { request } from '@/utils/request';
import {
  isTokenCloseToExpiry,
  refreshAccessToken,
} from '@/utils/jwt';

/**
 * !!!MERIXSTUDIO DOCS PART!!!
 *
 * CONFIG NOTE:
 * https://github.com/nextauthjs/next-auth/releases/tag/v4.0.0-beta.5
 *
 * Beta.5 took few keys from "jwt" object config.
 *
 * They deleted following keys:
 * - signingKey
 * - verificationOptions
 * - encryption
 * - encryptionKey
 * - decryptionKey
 * - decryptionOptions
 *
 * Before this release we have used:
 * - signingKey
 * - verificationOptions
 *
 * They removed these keys for now but they also mentioned about returning them back soon.
 * That's why it's commented out rather than deleted
 *  */
// const JWT_ALG = process.env.JWT_ALG ? [process.env.JWT_ALG] : undefined;

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, {
  // https://next-auth.js.org/configuration/providers
  providers: [
    /**
     * @ts-ignore explanation
     *
     * Due to problems with next-auth typing described
     * here: https://github.com/nextauthjs/next-auth/issues/2701
     * and here: https://github.com/nextauthjs/next-auth/issues/2677
     *
     * we need to ignore ts linter for CredentialsProvider
     * our PR to fix error: https://github.com/nextauthjs/next-auth/pull/2763
     *
     * Then problem goes into this: https://github.com/nextauthjs/next-auth/issues/2709
     *
     */
    /* eslint-disable-next-line */
    // @ts-ignore
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        try {
          const {
            data: {
              access,
              refresh,
            },
          } = await request.post<CreateTokenPayload>(UnrestrictedEnpoints.CREATE,
            {
              password: credentials?.password,
              email: credentials?.email,
            });

          // Any object returned will be saved in `user` property of the JWT
          return {
            access,
            refresh,
          };
        } catch (e) {
          // If you return null or false then the credentials will be rejected
          return null;
        }
        // You can also Reject this callback with an Error or with a URL:
        // throw new Error('error message') // Redirect to error page
        // throw '/path/to/redirect'; // Redirect to a URL
      },
    }),
  ],

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async session({
      session,
      token,
    }) {
      if (token.error) {
        session.error = token.error;
      }

      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }

      if (token.refreshToken) {
        session.refreshToken = token.refreshToken;
      }

      return session;
    },
    async jwt({
      token,
      user,
    }) {
      /**
       * !!!MERIXSTUDIO DOCS PART!!!
       *
       * PROBLEM WITH TOKEN LENGTH IN NEXT-AUTH
       * FIXED BY: https://github.com/nextauthjs/next-auth/pull/3101
       *
       */

      if (user) {
        token.accessToken = user.access;
        token.refreshToken = user.refresh;
      }

      let newToken = token;

      // Access token is close to expire, try to update it
      if (newToken?.accessToken && isTokenCloseToExpiry(newToken.accessToken)) {
        newToken = await refreshAccessToken(newToken);
      }

      // Return previous token if the access token has not expired yet
      return newToken;
    },
  },
  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  session: {
    // Required to call jwt callback when using "useSession" in "request.tsx"
    strategy: 'jwt',
  },

  // ENV value required when deploying to production
  // https://next-auth.js.org/configuration/options#secret
  secret: process.env.SECRET,

  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    // This is used to generate the actual signingKey and produces a warning
    // message if not defined explicitly.
    secret: process.env.JWT_SECRET,
    // You can generate a signing key using `jose newkey -s 512 -t oct -a HS512`
    // This gives you direct knowledge of the key used to sign the token so you can use it
    // to authenticate indirectly (eg. to a database driver)
    // signingKey: process.env.JWT_SIGNING_KEY,
    // If you chose something other than the default algorithm for the signingKey (HS512)
    // you also need to configure the algorithm
    // verificationOptions: {
    //   algorithms: JWT_ALG,
    // },
    // Set to true to use encryption. Defaults to false (signing only).
    // encryption: true,
    // encryptionKey: JWT_ENCRYPTION_KEY,
    // // decryptionKey: encryptionKey,
    // decryptionOptions: {
    //   algorithms: ['A256GCM'],
    // },
  },

  // Enable debug messages in the console if you are having problems
  debug: Boolean(process.env.DEBUG_INFO),

  pages: {
    error: routePaths.error,
    signIn: routePaths.login,
    signOut: routePaths.home,
    // newUser: '/auth/new-user',
    // verifyRequest : '', // Check email message
  },
});

