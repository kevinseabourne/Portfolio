import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
