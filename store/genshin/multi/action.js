import {
  ADD_PLAYERS,
  ADD_SESSIONS,
  REMOVE_PLAYERS,
  REMOVE_SESSIONS,
  REPLACE_DATA,
} from './type'

export const addSession = (session) => (dispatch, state) => {
  const { sessions } = state().genshinmulti

  return dispatch({
    type: ADD_SESSIONS,
    payload: [...sessions, session],
  })
}

export const removeSession = (session) => (dispatch, state) => {
  const { sessions } = state().genshinmulti

  return dispatch({
    type: REMOVE_SESSIONS,
    payload: sessions.filter((sess) => sess.id !== session.id),
  })
}

export const updateSession = (session) => (dispatch, state) => {
  let { sessions } = state().genshinmulti

  let newSessions = sessions
  const idx = sessions.findIndex((sess) => sess.id === session.id)
  newSessions[idx] = session

  return dispatch({
    type: REMOVE_SESSIONS,
    payload: newSessions,
  })
}

export const addPlayers = (newPlayers) => (dispatch, state) => {
  let { players } = state().genshinmulti
  const addedPlayers = newPlayers.filter(
    (p) => !players.find((p2) => p2.id === p.id),
  )
  return dispatch({
    type: ADD_PLAYERS,
    payload: [...players, ...addedPlayers],
  })
}

export const updatePlayer = (player) => (dispatch, state) => {
  let { players } = state().genshinmulti
  const newPlayers = players
  const index = newPlayers.findIndex((p) => p.id === player.id)
  if (index != -1) {
    newPlayers[index] = player
  }
  return dispatch({
    type: ADD_PLAYERS,
    payload: newPlayers,
  })
}

export const replaceMultiData = (data) => (dispatch) => {
  return dispatch({
    type: REPLACE_DATA,
    payload: data,
  })
}

export const removePlayers = (ids) => (dispatch, state) => {
  let { players } = state().genshinmulti
  const newPlayers = players.filter((p) => !ids.includes(p.id))
  return dispatch({
    type: REMOVE_PLAYERS,
    payload: newPlayers,
  })
}
