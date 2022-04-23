import {
  EXCLUDED_CHARACTERS,
  INCLUDED_ELEMENTS,
  INCLUDED_WEAPONS,
  RARITY,
  SORT,
  FIRST_TEAM,
  SECOND_TEAM,
  SET_DATE,
  REPLACE_DATA,
} from './type'

const initialState = {
  excludedCharacters: [],
  elements: [],
  weapons: [],
  sort: 'name',
  rarity: 0,
  firstTeam: [],
  secondTeam: [],
  date: '',
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EXCLUDED_CHARACTERS:
      return { ...state, excludedCharacters: action.payload }
    case INCLUDED_ELEMENTS:
      return { ...state, elements: action.payload }
    case INCLUDED_WEAPONS:
      return { ...state, weapons: action.payload }
    case RARITY:
      return { ...state, rarity: action.payload }
    case SORT:
      return { ...state, sort: action.payload }
    case FIRST_TEAM:
      return { ...state, firstTeam: action.payload }
    case SECOND_TEAM:
      return { ...state, secondTeam: action.payload }
    case SET_DATE:
      return { ...state, date: action.payload }
    case REPLACE_DATA:
      return action.payload
    default:
      return state
  }
}
