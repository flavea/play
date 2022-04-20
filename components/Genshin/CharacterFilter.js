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
  const [excludedElements, setExcludedElements] = useState([])
  const [excludedWeapons, setExcludedWeapons] = useState([])
  const [excludedRarity, setExcludedRarity] = useState(0)
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
        if (excludedElements.includes(value)) {
          setExcludedElements(excludedElements.filter((e) => e !== value))
        } else {
          setExcludedElements([...excludedElements, value])
        }
        break
      case WEAPON:
        if (excludedWeapons.includes(value)) {
          setExcludedWeapons(excludedWeapons.filter((e) => e !== value))
        } else {
          setExcludedWeapons([...excludedWeapons, value])
        }
        break
      case RARITY:
        if (excludedRarity === 4 || excludedRarity === 5) {
          setExcludedRarity(0)
        } else {
          setExcludedRarity(value)
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
          setExcludedElements(item)
          break
        case WEAPON:
          setExcludedWeapons(item)
          break
        case RARITY:
          setExcludedRarity(item)
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
        c.rarity !== excludedRarity &&
        !excludedWeapons.includes(c.weapon) &&
        !excludedElements.includes(c.element) &&
        !excluded.find((e) => e.name === c.name && e.element === c.element),
    )

    newCharacters = sortBy(newCharacters, sort)

    setIncluded(newCharacters)
    setAvailableCharacters(newCharacters)
    setItem(RARITY, excludedRarity)
    setItem(ELEMENT, excludedElements)
    setItem(WEAPON, excludedWeapons)
    setItem(POOL, newCharacters)
    setItem(EXCLUSION, sortBy(excluded, sort))
  }, [excludedElements, excludedWeapons, excludedRarity, excluded])

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
                    excludedElements.includes(e) && BUTTON_DEFAULT,
                    !excludedElements.includes(e) &&
                      i % 2 === 0 &&
                      BUTTON_PRIMARY,
                    !excludedElements.includes(e) &&
                      i % 2 !== 0 &&
                      BUTTON_SECONDARY,
                    !excludedElements.includes(e) && e,
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
                    excludedWeapons.includes(e) && BUTTON_DEFAULT,
                    !excludedWeapons.includes(e) &&
                      i % 2 === 0 &&
                      BUTTON_PRIMARY,
                    !excludedWeapons.includes(e) &&
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
                  excludedRarity === 4 ? BUTTON_DEFAULT : BUTTON_PRIMARY,
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
                  excludedRarity === 5 ? BUTTON_DEFAULT : BUTTON_SECONDARY,
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
