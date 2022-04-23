/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  excludeCharacters,
  includeElements,
  includeWeapons,
  setDate,
  setFirstTeam,
  setRarity,
  setSecondTeam,
  setSort,
} from 'store/genshin/single/action'

import UIkit from 'uikit'
import CharacterPool from './CharacterPool'
import CharacterFilter from './CharacterFilter'
import CharacterList from './CharacterList'
import Header from './Header'
import { Button, Container, Grid } from './styled'

import { generateTeamPools, getCharacterPool } from 'helpers/genshin'

import { ELEMENT, RARITY, WEAPON } from './constants'

export const Genshin = () => {
  const {
    firstTeam,
    secondTeam,
    date,
    elements,
    weapons,
    rarity,
    excludedCharacters,
    sort,
  } = useSelector((state) => state.genshinsingle)
  const dispatch = useDispatch()
  const [pool, setPool] = useState([])

  const generateTeam = () => {
    const teams = generateTeamPools(pool)
    if (teams?.first) {
      const { first, second, date: newDate } = teams

      dispatch(setFirstTeam(first))
      dispatch(setSecondTeam(second))
      dispatch(setDate(newDate))
    } else {
      UIkit.modal.alert(
        'Can not have less than 8 characters in the pool, please remove some filters',
      )
    }
  }

  const setFilter = (type, value) => {
    switch (type) {
      case ELEMENT:
        dispatch(includeElements(value))
        break
      case WEAPON:
        dispatch(includeWeapons(value))
        break
      case RARITY:
        dispatch(setRarity(value))
        break
      default:
        break
    }
  }

  const updateSort = (value) => () => {
    dispatch(setSort(value))
  }

  const setExclusion = (character) => {
    dispatch(excludeCharacters(character, sort))
  }

  useEffect(() => {
    if (pool.length >= 8 && (firstTeam.length < 4 || secondTeam.length < 4)) {
      generateTeam()
    }
  }, [firstTeam, secondTeam, pool])

  useEffect(() => {
    const newPool = getCharacterPool(
      excludedCharacters,
      rarity,
      weapons,
      elements,
      sort,
    )
    setPool(newPool)
  }, [elements, weapons, rarity, excludedCharacters, sort])

  return (
    <Container>
      <Header
        title="Random Genshin Teams Generator"
        desc="A tool to generate random genshin teams to be used for fun challenges"
      >
        <Link href="/genshin/multi">
          <a className="uk-button uk-button-default uk-margin-small-bottom uk-button-small">
            Multiplayer Mode
          </a>
        </Link>
        <Link href="/genshin/info">
          <a className="uk-button uk-button-default uk-margin-small-left uk-margin-small-bottom uk-button-small">
            Info & Back up
          </a>
        </Link>
      </Header>
      <Grid className="yes-grid">
        <CharacterList
          characters={firstTeam}
          text="First Team"
          big={true}
          type="map"
        />
        <CharacterList
          characters={secondTeam}
          text="Second Team"
          big={true}
          type="map"
        />
      </Grid>
      <center>
        <p />
        <p>Generated: {date}</p>
        <Button
          className="uk-button-primary"
          onClick={() => {
            generateTeam()
          }}
        >
          Generate New Team
        </Button>
      </center>
      <h4 className="uk-h5 uk-text-bold">Filter Character</h4>
      <CharacterFilter
        updateFilter={setFilter}
        updateSort={updateSort}
        elements={elements}
        weapons={weapons}
        rarity={rarity}
        sort={sort}
      />
      <CharacterPool
        inclusionPool={pool}
        exclusionPool={excludedCharacters}
        setExclusion={setExclusion}
        sort={sort}
      />
    </Container>
  )
}

export default Genshin
