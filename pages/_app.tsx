import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Florian Demel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Personal website of Florian Demel." />
      </Head>
      {/* Fixed background image with overlay */}
      <div className="background-wrapper"></div>
      <div className="background-overlay"></div>
      
      {/* Content wrapper */}
      <div className="content-wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp