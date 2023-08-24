import React from 'react'
import Head from 'next/head'
import ChatGenerator from 'components/ChatGenerator'

export const ChatGeneratorPage = () => {
  const desc = 'Generate chat template.'
  const title = 'Chat Template Generator'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="description" content={desc} />
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={desc} />
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
        <meta property="og:url" content="https://play.ilma.dev/chat" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="https://play.ilma.dev/card.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@iarifiany" />
        <meta name="twitter:creator" content="@iarifiany" />
        <meta name="twitter:url" content="https://play.ilma.dev/chat" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content="https://play.ilma.dev/card.jpg" />
      </Head>
      <ChatGenerator />
    </>
  )
}

export default ChatGeneratorPage
