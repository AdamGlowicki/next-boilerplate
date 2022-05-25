import * as Sentry from '@sentry/nextjs';
import getConfig from 'next/config';

import environments from './environments';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const dev = process.env.NODE_ENV && process.env.NODE_ENV === 'development';
const environment = environments[process.env.NEXT_PUBLIC_ENV];

const { buildId } = getConfig().publicRuntimeConfig;

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: !dev,
  environment,
  release: buildId,
});
