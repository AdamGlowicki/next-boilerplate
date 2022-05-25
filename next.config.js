require('dotenv').config();

const childProcess = require('child_process');

const { withSentryConfig } = require('@sentry/nextjs');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const getBuildId = () => {
  try {
    /* The `2> /dev/null` part outputs the errors to `/dev/null`,
     * effectively suppressing the output error - otherwise an error is always
     * thrown on gitlab which might be misleading,
     * as it's not relevant in this case
     * https://stackoverflow.com/questions/19108895/what-does-the-2-mean-on-the-unix-command-line
     */
    return childProcess
      .execSync('git rev-parse HEAD 2> /dev/null')
      .toString();
  } catch {
    try {
      return childProcess
        .execSync('cat .git/HEAD')
        .toString();
    } catch (error) {
      console.error('Could not get commit SHA');

      return undefined;
      /* If there's ever a situation where the buildId would be `undefined` on production,
       * verify if there's a .git folder in the production build.
       * If there's no such folder, add a case to get the buildId from the env variables
       * and contact your nearest DevOps engineer to pass the commit sha to production envs.
       */
    }
  }
};

const buildId = getBuildId();

const sentryWebpackPluginOptions = {
  silent: true,
  include: '.next',
  urlPrefix: "~/_next",
  ignore: [
    'node_modules',
    'next.config.js'
  ],
  configFile: 'sentry.properties',
  generateBuildId: () => buildId,
  release: buildId,
  errorHandler: (err, invokeErr, compilation) => {
    compilation.warnings.push('Sentry CLI Plugin: ' + err.message);
  },
};

const nextConfig = {
  devtool: 'source-map',
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    buildId,
  },
  i18n: {
    locales: ['en', 'pl', 'ar-AE'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['rickandmortyapi.com']
  }
};

module.exports = withSentryConfig(withBundleAnalyzer(nextConfig), sentryWebpackPluginOptions);

