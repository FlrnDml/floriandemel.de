import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Florian Demel | Platform Engineer</title>
        <meta name="description" content="Platform Engineer specializing in cloud computing, software architecture, and fullstack development." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="background"></div>
      
      {/* Content wrapper */}
      <div className="content-wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp