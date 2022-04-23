import {
  getExcludedCharactersIds,
  setElements,
  setRarityFilter,
  setWeapons,
} from 'helpers/genshin'
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

export const excludeCharacters = (character) => (dispatch, state) => {
  const { excludedCharacters } = state().genshinsingle
  let newExcluded = getExcludedCharactersIds(excludedCharacters, character)

  return dispatch({
    type: EXCLUDED_CHARACTERS,
    payload: newExcluded,
  })
}

export const includeElements = (value) => (dispatch, state) => {
  const { elements } = state().genshinsingle
  let newElements = setElements(elements, value)

  return dispatch({
    type: INCLUDED_ELEMENTS,
    payload: newElements,
  })
}

export const includeWeapons = (value) => (dispatch, state) => {
  const { weapons } = state().genshinsingle
  let newWeapons = setWeapons(weapons, value)
  return dispatch({
    type: INCLUDED_WEAPONS,
    payload: newWeapons,
  })
}

export const setRarity = (value) => (dispatch, state) => {
  const { rarity } = state().genshinsingle
  let newValue = setRarityFilter(rarity, value)

  return dispatch({
    type: RARITY,
    payload: newValue,
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

export const replaceSingleData = (data) => (dispatch) => {
  return dispatch({
    type: REPLACE_DATA,
    payload: data,
  })
}
