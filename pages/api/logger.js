import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn:
      "https://4a827e4f8a5248c9b32a07f393d1c6df@o218772.ingest.sentry.io/5228647",
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
