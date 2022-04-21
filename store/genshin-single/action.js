import {
  EXCLUDED_CHARACTERS,
  INCLUDED_CHARACTERS,
  INCLUDED_ELEMENTS,
  INCLUDED_WEAPONS,
  RARITY,
  SORT,
  FIRST_TEAM,
  SECOND_TEAM,
  SET_DATE,
} from './type'

const sortBy = (array, by) => {
  if (by === 'weapon') {
    return array.sort((a, b) => a.weapon.localeCompare(b.weapon))
  }
  if (by === 'name') {
    return array.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (by === 'element') {
    return array.sort((a, b) => a.element.localeCompare(b.element))
  }
  if (by === 'rarity') return array.sort((a, b) => a.rarity < b.rarity)
}

export const excludeCharacters = (characters, sort) => (dispatch) => {
  return dispatch({
    type: EXCLUDED_CHARACTERS,
    payload: sortBy(characters, sort),
  })
}

export const includeCharacters = (characters, sort) => (dispatch) => {
  return dispatch({
    type: INCLUDED_CHARACTERS,
    payload: sortBy(characters, sort),
  })
}

export const includeElements = (elements) => (dispatch) => {
  return dispatch({
    type: INCLUDED_ELEMENTS,
    payload: elements,
  })
}

export const includeWeapons = (weapons) => (dispatch) => {
  return dispatch({
    type: INCLUDED_WEAPONS,
    payload: weapons,
  })
}

export const setRarity = (rarity) => (dispatch) => {
  return dispatch({
    type: RARITY,
    payload: rarity,
  })
}

export const setSort = (sort) => (dispatch) => {
  return dispatch({
    type: SORT,
    payload: sort,
  })
}

export const setFirstTeam = (team) => (dispatch) => {
  return dispatch({
    type: FIRST_TEAM,
    payload: team,
  })
}

export const setSecondTeam = (team) => (dispatch) => {
  return dispatch({
    type: SECOND_TEAM,
    payload: team,
  })
}

export const setDate = (date) => (dispatch) => {
  return dispatch({
    type: SET_DATE,
    payload: date,
  })
}
