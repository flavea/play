import characters from 'components/Genshin/characters'

export const sortBy = (array, by) => {
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

export const getExcludedCharactersIds = (excludedCharacters, character) => {
  let newExcluded = []

  if (excludedCharacters.find((ex) => ex === character.id)) {
    newExcluded = excludedCharacters.filter((ex) => ex !== character.id)
  } else {
    newExcluded = [...excludedCharacters, character.id]
  }

  return newExcluded
}

export const getCharacters = (ids, sort) => {
  const newCharacters = characters.filter((c) => ids.includes(c.id))

  return sort ? sortBy(newCharacters, sort) : newCharacters
}

export const getCharacterPool = (
  excludedCharacters,
  rarity,
  weapons,
  elements,
  sort,
) => {
  let newCharacters = characters.filter(
    (c) => !excludedCharacters.find((e) => e === c.id),
  )

  if (rarity !== 0) {
    newCharacters = newCharacters.filter((c) => c.rarity === rarity)
  }

  if (weapons.length > 0) {
    newCharacters = newCharacters.filter((c) => weapons.includes(c.weapon))
  }

  if (elements.length > 0) {
    newCharacters = newCharacters.filter((c) => elements.includes(c.element))
  }

  return sortBy(newCharacters, sort)
}

export const getRandom = (arr, n) => {
  let result = new Array(n),
    len = arr.length,
    taken = new Array(len)
  if (n > len) {
    throw new RangeError('getRandom: more elements taken than available')
  }
  while (n--) {
    let x = Math.floor(Math.random() * len)
    let res = arr[x in taken ? taken[x] : x]
    let results = result.filter((r) => Boolean(r))
    const isDuplicate = results.find((r) => r.name === res.name)
    if (isDuplicate) {
      n++
    } else {
      result[n] = res
    }
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

export const setWeapons = (weapons, value) => {
  let newWeapons = []
  if (weapons.includes(value)) {
    newWeapons = weapons.filter((e) => e !== value)
  } else {
    newWeapons = [...weapons, value]
  }
  return newWeapons
}

export const setElements = (elements, value) => {
  let newElements = []
  if (elements.includes(value)) {
    newElements = elements.filter((e) => e !== value)
  } else {
    newElements = [...elements, value]
  }

  return newElements
}

export const setRarityFilter = (rarity, value) => {
  let newValue = 0
  if (rarity !== value) {
    newValue = value
  }

  return newValue
}

export const generateTeamPools = (pool) => {
  if (pool.length >= 8) {
    const first = getRandom(pool, 4)
    const newPool = pool.filter((c) => !first.find((f) => f.name === c.name))
    const second = getRandom(newPool, 4)
    const date = new Date().toString()

    return {
      first: first.map((c) => c.id),
      second: second.map((c) => c.id),
      date,
    }
  } else if (pool.length > 0 && pool.length < 8) {
    return null
  }
}
