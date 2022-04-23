import {
  ADD_PLAYERS,
  ADD_SESSIONS,
  REMOVE_PLAYERS,
  REMOVE_SESSIONS,
  REPLACE_DATA,
  UPDATE_PLAYER,
  UPDATE_SESSION,
} from './type'

const initialState = {
  sessions: [],
  players: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SESSIONS:
      return { ...state, sessions: action.payload }
    case REMOVE_SESSIONS:
      return { ...state, sessions: action.payload }
    case UPDATE_SESSION:
      return { ...state, sessions: action.payload }
    case UPDATE_PLAYER:
      return { ...state, players: action.payload }
    case ADD_PLAYERS:
      return { ...state, players: action.payload }
    case REMOVE_PLAYERS:
      return { ...state, players: action.payload }
    case REPLACE_DATA:
      return action.payload
    default:
      return state
  }
}
