import type { AppProps } from "next/app";
import Head from "next/head";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "../components/Footer";

import SEO from "../components/SEO";

import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <script defer src="https://cloud.umami.is/script.js" data-website-id="44f3247d-3c4f-4f77-a8f3-696aa0ec59b8"></script>
      <SEO />
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
