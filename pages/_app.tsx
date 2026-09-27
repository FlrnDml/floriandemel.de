import type { AppProps } from "next/app";
import Head from "next/head";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "../components/Footer";

import SEO from "../components/SEO";
import { useAnalytics } from "../lib/analytics";

import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics();

  return (
    <>
      <script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="44f3247d-3c4f-4f77-a8f3-696aa0ec59b8"
        data-domains="floriandemel.de"
      ></script>
      <SEO />
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className={`${GeistSans.variable} ${GeistMono.variable} container`}>
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
