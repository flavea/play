/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Playground</title>
        <meta name="description" content="My next.js playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Playground</h1>

        <div className={styles.grid}>
          <Link href="/image" passHref>
            <a className={styles.card}>
              <h2>Online Image Editor &rarr;</h2>
              <p>
                Edit image online using css filters and generate the css code or
                download the image
              </p>
            </a>
          </Link>

          <Link href="/editor" passHref>
            <a className={styles.card}>
              <h2>Text Editor &rarr;</h2>
              <p>Experimenting using slate.js to create a text editor</p>
            </a>
          </Link>

          <Link href="/genshin" passHref>
            <a className={styles.card}>
              <h2>Genshin Team Generator &rarr;</h2>
              <p>Generate random genshin team for challenges</p>
            </a>
          </Link>

          <a href="https://ilma.dev" className={styles.card}>
            <h2>Main Website &rarr;</h2>
            <p>Owner&apos;s website.</p>
          </a>
        </div>
      </main>
    </div>
  )
}
