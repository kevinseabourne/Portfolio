const withSourceMaps = require("@zeit/next-source-maps")();
const Dotenv = require("dotenv-webpack");

module.exports = withSourceMaps({
  webpack(config, _options) {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
  env: {
    FIREBASE_ENDPOINT: process.env.FIREBASE_ENDPOINT,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    EMIALJS_TEMPLATEID: process.EMIALJS_TEMPLATEID,
    EMIALJS_USERID: process.env.EMIALJS_USERID,
  },
});
