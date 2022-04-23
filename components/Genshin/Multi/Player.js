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

import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker'
import moment from 'moment'

export const Player = ({ sessionPlayer, session, sort, massGen }) => {
  const dispatch = useDispatch()
  const { players } = useSelector((state) => state.genshinmulti)

  const { id, firstTeam, secondTeam, generatedDate } = sessionPlayer
  const player = players.find((p) => p.id === id)
  const { excludedCharacters, name } = player
  const { elements, weapons, rarity, type, stages, scoreType } = session

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

  const updateNewPlayer = (newPlayer) => {
    const newPlayers = session.players
    const index = newPlayers.findIndex((p) => p.id === player.id)
    if (index != -1) {
      newPlayers[index] = newPlayer
      dispatch(updateSession({ ...session, players: newPlayers }))
    }
  }

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

      updateNewPlayer(newPlayer)
    } else {
      UIkit.modal.alert(
        `${name} can not have less than 8 characters in the pool, please remove some filters`,
      )
    }
  }

  const updateScore = (stage, time) => {
    const newPlayer = {
      ...sessionPlayer,
      [stage]: time,
    }

    updateNewPlayer(newPlayer)
  }

  const updatePool = (character) => {
    const ids = getExcludedCharactersIds(excludedCharacters, character)
    const newPlayer = { ...player, excludedCharacters: ids }
    dispatch(updatePlayer(newPlayer))
  }

  const getTime = (time) => {
    const times = time.split(':')
    var m = moment().utcOffset(0)
    m.set({ hour: 0, minute: times[0], second: times[1], millisecond: 0 })
    return m
  }

  const stageName = type === 'Abyss' ? 'Chamber' : 'Stage'

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
            style={{ marginBottom: 5 }}
          >
            Generate Teams
          </Button>
        </div>
      </Flex>
      <IF condition={type && stages > 0}>
        <div className="uk-text-bold uk-margin-small-bottom">Time Scores</div>
        <div className="uk-grid-divider uk-child-width-expand@m" data-uk-grid>
          {new Array(stages).fill(0).map((_, i) => (
            <div
              className="uk-flex uk-flex-middle uk-margin-small"
              key={`${name}-${stageName}-${i + 1}`}
            >
              <p className="uk-margin-remove">{`${stageName} ${i + 1}`}</p>
              <IF condition={scoreType === 'time'}>
                <TimePicker
                  showHour={false}
                  className="uk-width-expand uk-margin-left"
                  value={
                    sessionPlayer[`${stageName}-${i + 1}`]
                      ? getTime(sessionPlayer[`${stageName}-${i + 1}`])
                      : ''
                  }
                  placeholder="mm:ss"
                  format="mm:ss"
                  onChange={(time) => {
                    if (time) {
                      const m = time.minutes()
                      const s = time.seconds()
                      updateScore(`${stageName}-${i + 1}`, `${m}:${s}`)
                    } else {
                      updateScore(`${stageName}-${i + 1}`, ``)
                    }
                  }}
                />
              </IF>
              <IF condition={scoreType !== 'time'}>
                <input
                  className="uk-input uk-width-expand uk-margin-left"
                  type="text"
                  placeholder="Score"
                  value={sessionPlayer[`${stageName}-${i + 1}`] || ''}
                  onChange={(e) => {
                    updateScore(`${stageName}-${i + 1}`, e.target.value)
                  }}
                />
              </IF>
            </div>
          ))}
        </div>
      </IF>
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
