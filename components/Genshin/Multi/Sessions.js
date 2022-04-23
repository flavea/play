/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { removePlayers, removeSession } from 'store/genshin/multi/action'

import UIkit from 'uikit'
import IF from 'components/If'
import { Box, Button, Flex } from '../styled'

export const Sessions = () => {
  const { sessions, players } = useSelector((state) => state.genshinmulti)
  const dispatch = useDispatch()

  const deleteSession = (session) => () => {
    UIkit.modal
      .confirm('Are you sure you want to delete this session?')
      .then(() => {
        UIkit.modal
          .confirm('Delete players from overall players pool?')
          .then(() => {
            dispatch(removePlayers(session.players.map((p) => p.id)))
          })
        dispatch(removeSession(session))
      })
  }

  if (sessions.length === 0) return null

  return (
    <>
      <hr />
      <h4 className="uk-h4 uk-text-bold">Sessions</h4>
      {sessions.map((sess) => (
        <Box key={sess.id}>
          <Flex>
            <div className="uk-width-expand">
              <h3 className="uk-card-title uk-margin-remove-bottom">
                {sess.name}
              </h3>
              <p className="uk-text-meta uk-margin-small-top">
                <ul className="uk-list">
                  <li className="uk-margin-remove-top">
                    <span className="uk-text-bold">Players:</span>{' '}
                    {players
                      .filter((p) => sess.players.find((p2) => p2.id === p.id))
                      .map((p) => p.name)
                      .join(', ')}
                  </li>
                  <IF condition={sess.elements.length}>
                    <li className="uk-margin-remove-top">
                      <span className="uk-text-bold">Elements:</span>{' '}
                      {sess.elements.join(', ')}
                    </li>
                  </IF>
                  <IF condition={sess.weapons.length}>
                    <li className="uk-margin-remove-top">
                      <span className="uk-text-bold">Weapons:</span>{' '}
                      {sess.weapons.join(', ')}
                    </li>
                  </IF>
                  <IF condition={sess.rarity !== 0}>
                    <li className="uk-margin-remove-top">
                      <span className="uk-text-bold">Rarity:</span>{' '}
                      {sess.rarity} stars
                    </li>
                  </IF>
                </ul>
              </p>
            </div>
            <div>
              <Link href="/genshin/multi/[id]" as={`/genshin/multi/${sess.id}`}>
                <a>
                  <Button className="uk-button-small uk-button-primary uk-width-expand uk-flex-center">
                    Configure
                  </Button>
                </a>
              </Link>
              <Button
                className="uk-button-small uk-button-danger uk-margin-small-top uk-width-expand uk-flex-center"
                onClick={deleteSession(sess)}
              >
                Delete
              </Button>
            </div>
          </Flex>
        </Box>
      ))}
    </>
  )
}

export default Sessions
