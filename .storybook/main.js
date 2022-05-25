const path = require('path');

module.exports = {
  core: {
    /**
    * Required since svgr/webpack loader works only with webpack5
    *
    * Docs: https://react-svgr.com/docs/migrate/#webpack
    * Our next already use webpack5 so we don't have a problem here
    *
    */
    builder: "webpack5",
  },
  stories: [
    "../app/**/*.stories.mdx",
    "../app/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  staticDirs: ['../public'],
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "../app"),
      "public": path.resolve(__dirname, "../public/"),
    };

    // We have to exclude svg from asset/resource loader
    config.module.rules.find(rule => rule.test && rule.test.test('.svg')).exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
}
