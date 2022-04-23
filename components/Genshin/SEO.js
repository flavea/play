import Head from 'next/head'

export const SEO = () => {
  const desc = 'Generate random teams for Genshin Impact challenges.'
  const title = 'Genshin Team Randomizer | Genshin Team Generator'
  const card = 'https://play.ilma.dev/genshin_card.jpg'

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="description" content={desc} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={desc} />
      <meta
        name="keywords"
        content="genshin impact, genshin, genshin team randomizer, genshin team randomiser, random genshin team"
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
      <meta property="og:url" content="https://play.ilma.dev/genshin" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={card} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@iarifiany" />
      <meta name="twitter:creator" content="@iarifiany" />
      <meta name="twitter:url" content={card} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={card} />
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
  )
}

export default SEO
