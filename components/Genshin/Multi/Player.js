/* eslint-disable no-case-declarations */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePlayer, updateSession } from 'store/genshin/multi/action'
import {
  generateTeamPools,
  getCharacterPool,
  getCharacters,
  getExcludedCharactersIds,
} from 'helpers/genshin'

import UIkit from 'uikit'
import IF from 'components/If'
import CharacterPool from '../CharacterPool'
import { Box, Button, Flex, Grid } from '../styled'
import CharacterList from '../CharacterList'

export const Player = ({ sessionPlayer, session, sort, massGen }) => {
  const dispatch = useDispatch()
  const { players } = useSelector((state) => state.genshinmulti)

  const { id, firstTeam, secondTeam, generatedDate } = sessionPlayer
  const player = players.find((p) => p.id === id)
  const { excludedCharacters, name } = player
  const { elements, weapons, rarity } = session

  const [pool, setPool] = useState([])
  const [exclusionPool, setExclusionPool] = useState([])
  const [openConfiguration, setOpenConfiguration] = useState(false)

  useEffect(() => {
    const newPool = getCharacterPool(
      excludedCharacters,
      rarity,
      weapons,
      elements,
      sort,
    )
    setPool(newPool)
  }, [session, sort, excludedCharacters])

  useEffect(() => {
    const newPool = getCharacters(excludedCharacters, sort)
    setExclusionPool(newPool)
  }, [player, sort])

  useEffect(() => {
    if (massGen) generateTeam()
  }, [massGen])

  const generateTeam = () => {
    const teams = generateTeamPools(pool)
    if (teams?.first) {
      const { first, second, date: newDate } = teams

      const newPlayer = {
        ...sessionPlayer,
        firstTeam: first,
        secondTeam: second,
        generatedDate: newDate,
      }

      const newPlayers = session.players
      const index = newPlayers.findIndex((p) => p.id === player.id)
      if (index != -1) {
        newPlayers[index] = newPlayer
        dispatch(updateSession({ ...session, players: newPlayers }))
      }
    } else {
      UIkit.modal.alert(
        `${name} can not have less than 8 characters in the pool, please remove some filters`,
      )
    }
  }

  const updatePool = (character) => {
    const ids = getExcludedCharactersIds(excludedCharacters, character)
    const newPlayer = { ...player, excludedCharacters: ids }
    dispatch(updatePlayer(newPlayer))
  }

  return (
    <Box>
      <Flex>
        <div className="uk-width-expand">
          <h3 className="uk-card-title uk-margin-remove-bottom">{name}</h3>
          <p className="uk-text-meta uk-margin-small-top">
            <ul className="uk-list">
              <li className="uk-margin-remove-top">
                <span className="uk-text-bold">Excluded Characters:</span>{' '}
                {exclusionPool.length
                  ? exclusionPool.map((p) => p.name).join(', ')
                  : '-'}
              </li>
              <li className="uk-margin-remove-top">
                <span className="uk-text-bold">Generated Date:</span>{' '}
                {generatedDate || '-'}
              </li>
            </ul>
          </p>
        </div>
        <div>
          <Button
            onClick={() => setOpenConfiguration(!openConfiguration)}
            className="uk-button-small uk-button-primary uk-width-expand uk-flex-center"
            style={{ marginBottom: 5 }}
          >
            Configure Pool
          </Button>
          <Button
            onClick={() => generateTeam()}
            className="uk-button-small uk-button-secondary uk-width-expand uk-flex-center"
          >
            Generate Teams
          </Button>
        </div>
      </Flex>
      <IF condition={firstTeam?.length}>
        <Grid className="yes-grid uk-margin-small">
          <CharacterList characters={firstTeam} text="First Team" type="map" />
          <CharacterList
            characters={secondTeam}
            text="Second Team"
            type="map"
          />
        </Grid>
      </IF>
      <IF condition={openConfiguration}>
        <CharacterPool
          inclusionPool={pool}
          exclusionPool={exclusionPool}
          setExclusion={updatePool}
        />
      </IF>
    </Box>
  )
}

export default Player
