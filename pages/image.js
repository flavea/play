import Head from 'next/head'
// eslint-disable-next-line import/no-unresolved
import Generator from 'components/ImageGenerator'

export const ImageGenerator = () => {
  const desc =
    'Online image editor using simple CSS variables that will generate an image code and can be saved as an image.'
  const title = 'CSS Image Editor'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="description" content={desc} />
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={desc} />
        <meta
          name="keywords"
          content="Image editor, online image editor, css image editor, css filters, css image generator, image filters generator."
        />
        <meta name="theme-color" content="##7d7d7d" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="msapplication-TileColor" content="##7d7d7d" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta property="og:site_name" content={title} />
        <meta property="og:url" content="https://play.ilma.dev/image" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="https://play.ilma.dev/card.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@iarifiany" />
        <meta name="twitter:creator" content="@iarifiany" />
        <meta name="twitter:url" content="https://play.ilma.dev/image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content="https://play.ilma.dev/card.jpg" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=UA-44755840-3`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-44755840-3', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <Generator />
    </>
  )
}

export default ImageGenerator
