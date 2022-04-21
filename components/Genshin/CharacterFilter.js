import { CharacterListCard, Grid } from './styled'
import characters from './characters'
import { useEffect, useLayoutEffect, useState } from 'react'
import clsx from 'clsx'
import CharacterList from './CharacterList'
import { AiFillStar } from 'react-icons/ai'

const elements = ['Pyro', 'Geo', 'Dendro', 'Cryo', 'Electro', 'Anemo', 'Hydro']
const weapons = ['Sword', 'Claymore', 'Catalyst', 'Polearm', 'Bow']
const sorts = Object.keys(characters[0])

const ELEMENT = 'elements'
const WEAPON = 'weapons'
const RARITY = 'rarity'
const POOL = 'pool'
const EXCLUSION = 'exclusion'

export const CharacterFilter = ({ setAvailableCharacters }) => {
  const [excluded, setExcluded] = useState([])
  const [included, setIncluded] = useState(characters)
  const [includedElements, setincludedElements] = useState([])
  const [includedWeapons, setincludedWeapons] = useState([])
  const [includedRarity, setincludedRarity] = useState(0)
  const [sort, setSort] = useState('name')

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

  const setExclusion = (character) => {
    let newExcluded = []

    if (
      excluded.find(
        (ex) => ex.name === character.name && ex.element === character.element,
      )
    ) {
      newExcluded = excluded.filter(
        (n) => n.name !== character.name && n.element !== character.element,
      )
    } else {
      newExcluded = [...excluded, character]
    }

    newExcluded = sortBy(newExcluded, sort)

    const newExcludedLength = newExcluded.length
    const characterLength = characters.length
    const left = characterLength - newExcludedLength

    if (left < 8) {
      alert('Can not have less than 8 characters in the pool')
    } else {
      setExcluded(newExcluded)
    }
  }

  const setFilter = (type, value) => {
    switch (type) {
      case ELEMENT:
        if (includedElements.includes(value)) {
          setincludedElements(includedElements.filter((e) => e !== value))
        } else {
          setincludedElements([...includedElements, value])
        }
        break
      case WEAPON:
        if (includedWeapons.includes(value)) {
          setincludedWeapons(includedWeapons.filter((e) => e !== value))
        } else {
          setincludedWeapons([...includedWeapons, value])
        }
        break
      case RARITY:
        if (includedRarity === value) {
          setincludedRarity(0)
        } else {
          setincludedRarity(value)
        }
        break
      default:
        break
    }
  }

  const setItem = (type, value) => {
    if (value != undefined) {
      localStorage.setItem(type, JSON.stringify(value))
    }
  }

  const parseItem = (type) => {
    let item = localStorage.getItem(type)
    let sorted = localStorage.getItem('sort') || sort || 'name'
    setSort(sorted)
    if (item) {
      if (type !== 'rarity') {
        item = JSON.parse(item)
      } else {
        item = Number(item)
      }
      switch (type) {
        case ELEMENT:
          setincludedElements(item)
          break
        case WEAPON:
          setincludedWeapons(item)
          break
        case RARITY:
          setincludedRarity(item)
          break
        case POOL:
          // eslint-disable-next-line no-case-declarations
          const items = sortBy(item, sorted)
          setIncluded(items)
          setAvailableCharacters(items)
          break
        case EXCLUSION:
          setExcluded(sortBy(item, sorted))
          break
        default:
          break
      }
    }
  }

  const updateSort = (value) => () => {
    setSort(value)
    localStorage.setItem('sort', value)
    const sortedIncluded = sortBy(included, value)
    const sortedExcluded = sortBy(excluded, value)
    setIncluded(sortedIncluded)
    setExcluded(sortedExcluded)
  }

  useEffect(() => {
    let newCharacters = characters.filter(
      (c) =>
        !excluded.find((e) => e.name === c.name && e.element === c.element),
    )

    if (includedRarity !== 0) {
      newCharacters = newCharacters.filter((c) => c.rarity === includedRarity)
    }

    if (includedWeapons.length > 0) {
      newCharacters = newCharacters.filter((c) =>
        includedWeapons.includes(c.weapon),
      )
    }
    if (includedElements.length > 0) {
      newCharacters = newCharacters.filter((c) =>
        includedElements.includes(c.element),
      )
    }

    newCharacters = sortBy(newCharacters, sort)

    setIncluded(newCharacters)
    setAvailableCharacters(newCharacters)
    setItem(RARITY, includedRarity)
    setItem(ELEMENT, includedElements)
    setItem(WEAPON, includedWeapons)
    setItem(POOL, newCharacters)
    setItem(EXCLUSION, sortBy(excluded, sort))
  }, [includedElements, includedWeapons, includedRarity, excluded])

  useLayoutEffect(() => {
    parseItem(RARITY)
    parseItem(ELEMENT)
    parseItem(WEAPON)
    parseItem(POOL)
    parseItem(EXCLUSION)
  }, [])

  const BUTTON_DEFAULT = 'uk-button-default'
  const BUTTON_PRIMARY = 'uk-button-primary'
  const BUTTON_SECONDARY = 'uk-button-secondary'

  return (
    <>
      <h4 className="uk-h5 uk-text-bold">Filter Character</h4>
      <CharacterListCard style={{ maxHeight: '500px' }}>
        <div>
          <div className="filter">
            <div className="uk-text-small filter-name">Elements</div>
            <div className="uk-button-group">
              {elements.map((e, i) => (
                <button
                  key={e}
                  className={clsx(
                    'uk-button',
                    !includedElements.includes(e) && BUTTON_DEFAULT,
                    includedElements.includes(e) &&
                      i % 2 === 0 &&
                      BUTTON_PRIMARY,
                    includedElements.includes(e) &&
                      i % 2 !== 0 &&
                      BUTTON_SECONDARY,
                    includedElements.includes(e) && e,
                  )}
                  onClick={() => {
                    setFilter('elements', e)
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="filter">
            <div className="uk-text-small filter-name">Weapon Type</div>
            <div className="uk-button-group">
              {weapons.map((e, i) => (
                <button
                  key={e}
                  className={clsx(
                    'uk-button',
                    !includedWeapons.includes(e) && BUTTON_DEFAULT,
                    includedWeapons.includes(e) &&
                      i % 2 === 0 &&
                      BUTTON_PRIMARY,
                    includedWeapons.includes(e) &&
                      i % 2 !== 0 &&
                      BUTTON_SECONDARY,
                  )}
                  onClick={() => {
                    setFilter('weapons', e)
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="filter">
            <div className="uk-text-small filter-name">Rarity</div>
            <div className="uk-button-group">
              <button
                key="e"
                className={clsx(
                  'uk-button',
                  includedRarity === 4 ? BUTTON_PRIMARY : BUTTON_DEFAULT,
                )}
                onClick={() => {
                  setFilter('rarity', 4)
                }}
              >
                4 <AiFillStar />
              </button>
              <button
                key="e"
                className={clsx(
                  'uk-button',
                  includedRarity === 5 ? BUTTON_PRIMARY : BUTTON_DEFAULT,
                )}
                onClick={() => {
                  setFilter('rarity', 5)
                }}
              >
                5 <AiFillStar />
              </button>
            </div>
          </div>
          <div className="filter">
            <div className="uk-text-small filter-name">Sort By</div>
            <div className="uk-button-group">
              {sorts.map((e) => (
                <button
                  key={`sort-${e}`}
                  className={clsx(
                    'uk-button',
                    sort !== e && BUTTON_DEFAULT,
                    sort === e && BUTTON_SECONDARY,
                  )}
                  onClick={updateSort(e)}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CharacterListCard>
      <Grid className={excluded.length > 0 ? 'yes-grid' : null}>
        <CharacterList
          title="Character Pool"
          characters={included}
          text="Click character icon to exclude from character pool"
          setExclusion={setExclusion}
        />
        <CharacterList
          title="Excluded Characters"
          characters={excluded}
          text="Click character icon to put character back into character pool"
          setExclusion={setExclusion}
          opacity={true}
        />
      </Grid>
    </>
  )
}

export default CharacterFilter
