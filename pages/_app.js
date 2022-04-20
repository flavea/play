import 'uikit/dist/css/uikit-core.min.css'
import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.min.js'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/global.css" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
