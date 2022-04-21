/* eslint-disable no-case-declarations */
import { CharacterListCard, Grid } from './styled'
import characters from './characters'
import { useEffect } from 'react'
import clsx from 'clsx'
import CharacterList from './CharacterList'
import { AiFillStar } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import {
  excludeCharacters,
  includeCharacters,
  includeElements,
  includeWeapons,
  setRarity,
  setSort,
} from 'store/genshin-single/action'

const elementsList = [
  'Pyro',
  'Geo',
  'Dendro',
  'Cryo',
  'Electro',
  'Anemo',
  'Hydro',
]
const weaponsList = ['Sword', 'Claymore', 'Catalyst', 'Polearm', 'Bow']
const sorts = Object.keys(characters[0])

const ELEMENT = 'elements'
const WEAPON = 'weapons'
const RARITY = 'rarity'

export const CharacterFilter = () => {
  const {
    elements,
    weapons,
    rarity,
    sort,
    excludedCharacters,
    includedCharacters,
  } = useSelector((state) => state.genshinsingle)
  const dispatch = useDispatch()

  const setExclusion = (character) => {
    let newExcluded = []

    if (
      excludedCharacters.find(
        (ex) => ex.name === character.name && ex.element === character.element,
      )
    ) {
      newExcluded = excludedCharacters.filter(
        (n) => n.name !== character.name && n.element !== character.element,
      )
    } else {
      newExcluded = [...excludedCharacters, character]
    }

    const newExcludedLength = newExcluded.length
    const characterLength = characters.length
    const left = characterLength - newExcludedLength

    if (left < 8) {
      alert('Can not have less than 8 characters in the pool')
    } else {
      dispatch(excludeCharacters(newExcluded, sort))
    }
  }

  const setFilter = (type, value) => {
    switch (type) {
      case ELEMENT:
        let newElements = []
        if (elements.includes(value)) {
          newElements = elements.filter((e) => e !== value)
        } else {
          newElements = [...elements, value]
        }
        dispatch(includeElements(newElements))
        break
      case WEAPON:
        let newWeapons = []
        if (weapons.includes(value)) {
          newWeapons = weapons.filter((e) => e !== value)
        } else {
          newWeapons = [...weapons, value]
        }
        dispatch(includeWeapons(newWeapons))
        break
      case RARITY:
        if (rarity === value) {
          dispatch(setRarity(0))
        } else {
          dispatch(setRarity(value))
        }
        break
      default:
        break
    }
  }

  const updateSort = (value) => () => {
    dispatch(setSort(value))
    localStorage.setItem('sort', value)
    dispatch(includeCharacters(includedCharacters, value))
    dispatch(excludeCharacters(excludedCharacters, value))
  }

  useEffect(() => {
    let newCharacters = characters.filter(
      (c) =>
        !excludedCharacters.find(
          (e) => e.name === c.name && e.element === c.element,
        ),
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

    dispatch(includeCharacters(newCharacters, sort))
  }, [elements, weapons, rarity, excludedCharacters])

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
              {elementsList.map((e, i) => (
                <button
                  key={e}
                  className={clsx(
                    'uk-button',
                    !elements.includes(e) && BUTTON_DEFAULT,
                    elements.includes(e) && i % 2 === 0 && BUTTON_PRIMARY,
                    elements.includes(e) && i % 2 !== 0 && BUTTON_SECONDARY,
                    elements.includes(e) && e,
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
              {weaponsList.map((e, i) => (
                <button
                  key={e}
                  className={clsx(
                    'uk-button',
                    !weapons.includes(e) && BUTTON_DEFAULT,
                    weapons.includes(e) && i % 2 === 0 && BUTTON_PRIMARY,
                    weapons.includes(e) && i % 2 !== 0 && BUTTON_SECONDARY,
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
                  rarity === 4 ? BUTTON_PRIMARY : BUTTON_DEFAULT,
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
                  rarity === 5 ? BUTTON_PRIMARY : BUTTON_DEFAULT,
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
      <Grid className={excludedCharacters.length > 0 ? 'yes-grid' : null}>
        <CharacterList
          title="Character Pool"
          characters={includedCharacters}
          text="Click character icon to exclude from character pool"
          setExclusion={setExclusion}
        />
        <CharacterList
          title="Excluded Characters"
          characters={excludedCharacters}
          text="Click character icon to put character back into character pool"
          setExclusion={setExclusion}
          opacity={true}
        />
      </Grid>
    </>
  )
}

export default CharacterFilter
