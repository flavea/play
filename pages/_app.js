/* eslint-disable @next/next/no-css-tags */
import 'uikit/dist/css/uikit-core.min.css'
import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.min.js'
import Head from 'next/head'
import PageLoader from 'components/PageLoader'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => {
      setLoading(true)
    }
    const handleStop = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/global.css" />
      </Head>
      <Component {...pageProps} />

      {loading ? <PageLoader /> : null}
    </>
  )
}

export default MyApp
