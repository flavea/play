/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-case-declarations */
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSession } from 'store/genshin/multi/action'

import CharacterFilter from '../CharacterFilter'
import Header from '../Header'
import Player from './Player'
import Sessions from './Sessions'
import { Button, Container } from '../styled'

import uuid from 'helpers/uuid'
import { setElements, setRarityFilter, setWeapons } from 'helpers/genshin'
import { ELEMENT, RARITY, WEAPON } from '../constants'

export const Session = ({ id }) => {
  const { sessions } = useSelector((state) => state.genshinmulti)
  const dispatch = useDispatch()
  const session = sessions.find((sess) => sess.id === id)
  const [sort, setSort] = useState('name')
  const [gen, setGen] = useState('')

  if (!session) {
    return (
      <Container>
        <h3 className="uk-h3 uk-text-bold uk-margin-auto-bottom">
          Session Not Found
        </h3>
      </Container>
    )
  }

  const { elements, weapons, rarity, players } = session

  const setFilter = (type, value) => {
    switch (type) {
      case ELEMENT:
        const newElements = setElements(elements, value)
        const newElementsSessions = {
          ...session,
          elements: newElements,
        }
        dispatch(updateSession(newElementsSessions))
        break
      case WEAPON:
        const newWeapons = setWeapons(weapons, value)
        const newWeaponSession = {
          ...session,
          weapons: newWeapons,
        }
        dispatch(updateSession(newWeaponSession))
        break
      case RARITY:
        const newRarity = setRarityFilter(rarity, value)
        const newSession = {
          ...session,
          rarity: newRarity,
        }
        dispatch(updateSession(newSession))

        break
      default:
        break
    }
  }

  const updateSort = (news) => () => {
    setSort(news)
  }

  return (
    <Container>
      <Header
        title={session.name}
        desc="A tool to generate random genshin teams to be used for fun challenges"
      >
        <Link href="/genshin/multi">
          <a className="uk-button uk-button-default">Back</a>
        </Link>
      </Header>
      <hr />
      <h4 className="uk-h5 uk-text-bold">Global Character Filter</h4>
      <CharacterFilter
        updateFilter={setFilter}
        updateSort={updateSort}
        elements={elements}
        weapons={weapons}
        rarity={rarity}
        sort={sort}
      />
      <div className="uk-flex uk-flex-between uk-flex-middle uk-margin">
        <h5 className="uk-h5 uk-text-bold uk-margin-remove-bottom">Players</h5>
        <Button onClick={() => setGen(uuid())} className="uk-button-primary">
          Generate Teams for All Players
        </Button>
      </div>
      {players.map((p) => (
        <Player
          key={p}
          session={session}
          sort={sort}
          massGen={gen}
          sessionPlayer={p}
        />
      ))}
    </Container>
  )
}

export default Sessions
