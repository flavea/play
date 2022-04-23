/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'

import Form from './Form'
import Header from '../Header'
import Sessions from './Sessions'
import { Container } from '../styled'

export const GenshinMulti = () => {
  return (
    <Container>
      <Header
        title="Genshin Teams Generator - Multiplayer"
        desc="A tool to generate random genshin teams to be used for fun challenges"
      >
        <Link href="/genshin">
          <a className="uk-button uk-button-default uk-margin-small-bottom uk-button-small">
            Singleplayer Mode
          </a>
        </Link>
        <Link href="/genshin/info">
          <a className="uk-button uk-button-default uk-margin-small-left uk-margin-small-bottom uk-button-small">
            Info & Backup
          </a>
        </Link>
      </Header>

      <hr />

      <Form />
      <hr />
      <Sessions />
    </Container>
  )
}

export default GenshinMulti
