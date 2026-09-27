import { Head, Html, Main, NextScript } from "next/document";

/**
 * Content Security Policy for the static export. GitHub Pages cannot set
 * response headers, so the policy is delivered as a meta tag. It is only
 * applied to production builds because the dev server relies on eval for
 * hot reloading. Update it whenever a third-party service is added.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' https://cloud.umami.is",
  "connect-src 'self' https://cloud.umami.is https://api-gateway.umami.dev",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "upgrade-insecure-requests",
].join("; ");

export default function Document() {
  return (
    <Html>
      <Head>
        {process.env.NODE_ENV === "production" && (
          <meta
            httpEquiv="Content-Security-Policy"
            content={contentSecurityPolicy}
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
