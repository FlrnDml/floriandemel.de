import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import Explorer from "../components/Explorer";
import Editor from "../components/Editor";
import Footer from "../components/Footer";

import SEO from "../components/SEO";

// Global CSS
import "../styles/index.css";
// Component CSS
import "../styles/components/Button.css";
import "../styles/components/Editor.css";
import "../styles/components/Explorer.css";
import "../styles/components/Footer.css";
import "../styles/components/Hero.css";
import "../styles/components/Section.css";
import "../styles/components/TypewriterEffect.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <script defer src="https://cloud.umami.is/script.js" data-website-id="44f3247d-3c4f-4f77-a8f3-696aa0ec59b8"></script>
      <SEO />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="background"></div>

      <div className="layout-wrapper">
        <Explorer />
        <main className="main-content">
          <Editor>
            <Component {...pageProps} />
          </Editor>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default MyApp;
