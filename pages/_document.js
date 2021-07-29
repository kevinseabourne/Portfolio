import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import * as Sentry from "@sentry/browser";

process.on("unhandledRejection", (err) => {
  Sentry.captureException(err);
});

process.on("uncaughtException", (err) => {
  Sentry.captureException(err);
});

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js"
        ></script>
        <script>
          (function() {emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID)}
          )();
        </script> */}

          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            property="og:title"
            content="Portfolio | Kevin Seabourne"
            key="portfolio"
          />
          <meta
            name="description"
            property="og:title"
            content="Portfolio | Kevin Seabourne"
            key="portfolio"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
