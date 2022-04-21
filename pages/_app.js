/* eslint-disable @next/next/no-css-tags */
import 'uikit/dist/css/uikit-core.min.css'
import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.min.js'
import Head from 'next/head'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from 'store/store'

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state)
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/global.css" />
      </Head>
      {process.browser ? (
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          <Component {...pageProps} />
        </PersistGate>
      ) : (
        <PersistGate persistor={store}>
          <Component {...pageProps} />
        </PersistGate>
      )}
    </>
  )
}

export default wrapper.withRedux(MyApp)
