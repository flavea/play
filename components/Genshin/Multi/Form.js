/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addPlayers, addSession } from 'store/genshin/multi/action'

import UIkit from 'uikit'
import IF from 'components/If'
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai'
import { Box, Button, PlayerButton } from '../styled'

import uuid from 'helpers/uuid'
import { stageTypes } from '../constants'

export const Form = () => {
  const { players: statePlayers } = useSelector((state) => state.genshinmulti)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [temporaryName, setTemporaryName] = useState('')
  const [players, setPlayers] = useState([])
  const [shownPlayers, setShownPlayers] = useState([])
  const [showList, setShowList] = useState(false)
  const [type, setType] = useState('')
  const [stageCount, setStageCount] = useState(2)

  const createNewSession = () => {
    const id = uuid()

    if (!name) {
      UIkit.modal.alert('Session name must be filled')

      return
    }
    if (players.length < 2) {
      UIkit.modal.alert('Must have more than or equal to two players')
      return
    }

    dispatch(addPlayers(players))

    const session = {
      id,
      name,
      players: players.map((p) => ({
        id: p.id,
        firstTeam: [],
        secondTeam: [],
        generatedDate: '-',
      })),
      elements: [],
      weapons: [],
      rarity: 0,
      type,
      stages: type === 'Abyss' ? 3 : type === 'Domains' ? 1 : stageCount,
    }

    setName('')
    setPlayers([])
    setTemporaryName('')
    dispatch(addSession(session))
  }

  const filterPlayers = () => {
    const shown = statePlayers.filter(
      (p) => !players.find((p2) => p2.id === p.id),
    )
    setShownPlayers(shown)
  }

  useEffect(filterPlayers, [players, statePlayers])

  return (
    <>
      <h4 className="uk-h4 uk-text-bold">Create New Session</h4>
      <fieldset className="uk-fieldset">
        <div className="uk-margin-small">
          <input
            className="uk-input"
            type="text"
            placeholder="Session Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <h5 className="uk-h5 uk-margin-remove-top uk-margin-remove-bottom">
          Select Type Of Stages
        </h5>
        <div className="uk-margin-small">
          {stageTypes.map((stage) => (
            <label key={stage.name} className="uk-flex uk-flex-middle">
              <input
                className="uk-radio uk-margin-small-right"
                type="radio"
                name="radio2"
                checked={type === stage.name}
                onChange={() => setType(stage.name)}
              />
              <div>
                {stage.name}
                <div className="uk-text-small">{stage.desc}</div>
              </div>
            </label>
          ))}

          <IF condition={type === 'Others'}>
            <div className="uk-margin">
              <div className="uk-form-label uk-margin-bottom-small">
                Number of Stages (Max: 2, Min: 4)
              </div>
              <div className="uk-form-controls">
                <input
                  className="uk-input"
                  type="number"
                  placeholder="Input Stage Count"
                  value={stageCount}
                  min={2}
                  max={4}
                  onChange={(e) => {
                    const num = Number(e.target.value)
                    setStageCount(num < 2 ? 2 : num > 4 ? 4 : num)
                  }}
                />
              </div>
            </div>
          </IF>
        </div>
        <h5 className="uk-h5 uk-margin-remove-top uk-margin-remove-bottom">
          Players
        </h5>

        {players.map((p, i) => (
          <div className="uk-margin-small uk-flex" key={p}>
            <input
              className="uk-input"
              type="text"
              placeholder="Player"
              value={p.name}
              readOnly
              disabled
            />
            <Button
              className="uk-button-primary"
              onClick={() => {
                setPlayers(players.filter((v, idx) => idx !== i))
              }}
            >
              -
            </Button>
          </div>
        ))}

        <IF condition={players.length < 6}>
          <div className="uk-margin-small uk-flex">
            <input
              className="uk-input"
              type="text"
              placeholder="Player Name"
              value={temporaryName}
              onChange={(e) => setTemporaryName(e.target.value)}
            />
            <Button
              className="uk-button-primary uk-flex-1"
              onClick={() => {
                const newPlayer = {
                  id: uuid(),
                  name: temporaryName,
                  excludedCharacters: [],
                }
                setPlayers([...players, newPlayer])
                setTemporaryName('')
              }}
            >
              Add
            </Button>
          </div>

          <IF condition={statePlayers.length > 0}>
            <div className="uk-heading-line uk-text-center uk-text-small uk-text-muted uk-margin-small">
              <span>or</span>
            </div>

            <div className="uk-display-block">
              <Button
                className="uk-button-default uk-width-expand uk-text-muted uk-flex-between"
                type="button"
                onClick={() => setShowList(!showList)}
              >
                Add Existing Players{' '}
                {showList ? (
                  <AiFillCaretUp className="uk-margin-small-left" />
                ) : (
                  <AiFillCaretDown className="uk-margin-small-left" />
                )}
              </Button>
              <IF condition={showList}>
                <Box>
                  <div className="uk-margin">
                    <div className="uk-inline-block uk-width-1-1">
                      <span className="uk-form-icon">
                        <AiOutlineSearch />
                      </span>
                      <input
                        className="uk-input uk-width-expand"
                        type="text"
                        placeholder="Find Player By Name"
                        onChange={(e) => {
                          if (e.target.value) {
                            const updateShown = shownPlayers.filter((p) =>
                              p.name.includes(e.target.value),
                            )
                            setShownPlayers(updateShown)
                          } else {
                            filterPlayers()
                          }
                        }}
                      />
                    </div>
                  </div>

                  <Box style={{ maxHeight: 250 }}>
                    <IF condition={shownPlayers.length === 0}>
                      No players are matching the query
                    </IF>
                    <IF condition={shownPlayers.length}>
                      <ul className="uk-nav uk-dropdown-nav">
                        {shownPlayers.map((p) => (
                          <li key={p.id}>
                            <PlayerButton
                              onClick={() => {
                                setPlayers([...players, p])
                              }}
                            >
                              {p.name}
                            </PlayerButton>
                          </li>
                        ))}
                      </ul>
                    </IF>
                  </Box>
                </Box>
              </IF>
            </div>
            <div className="uk-margin-small uk-text-small uk-text-muted uk-text-right">
              <b>Note:</b> Player&apos;s excluded characters setting will carry
              over and syncronize between different sessions
            </div>
          </IF>
        </IF>

        <div className="uk-margin-small">
          <Button
            className="uk-button-secondary uk-flex uk-flex-middle"
            onClick={() => createNewSession()}
          >
            <AiOutlinePlus className="uk-margin-small-right" /> Create
          </Button>
        </div>
      </fieldset>
    </>
  )
}

export default Form
