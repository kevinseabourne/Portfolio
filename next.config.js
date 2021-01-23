// const withSourceMaps = require("@zeit/next-source-maps");
const Dotenv = require("dotenv-webpack");

// module.exports = withSourceMaps({
//   webpack(config, _options) {
//     config.plugins.push(new Dotenv({ silent: true }));
//     return config;
//   },
//   env: {
//     FIREBASE_ENDPOINT: process.env.FIREBASE_ENDPOINT,
//     FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
//     FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
//     FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
//     SENTRY_DSN: process.env.SENTRY_DSN,
//     EMAILJS_ENDPOINT: process.env.EMAILJS_ENDPOINT,
//     EMAILJS_USER_ID: process.env.EMAILJS_USER_ID,
//     EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
//   },
// });

module.exports = {
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },

  env: {
    FIREBASE_ENDPOINT: process.env.FIREBASE_ENDPOINT,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    EMAILJS_ENDPOINT: process.env.EMAILJS_ENDPOINT,
    EMAILJS_USER_ID: process.env.EMAILJS_USER_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
  },
};
