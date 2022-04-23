/* eslint-disable no-case-declarations */
import clsx from 'clsx'

import { AiFillStar } from 'react-icons/ai'
import { Button, CharacterListCard } from './styled'

import {
  ELEMENT,
  elementsList,
  RARITY,
  sorts,
  WEAPON,
  weaponsList,
} from './constants'

export const CharacterFilter = ({
  updateSort,
  updateFilter,
  elements,
  weapons,
  rarity,
  sort,
}) => {
  const BUTTON_DEFAULT = 'uk-button-default'
  const BUTTON_PRIMARY = 'uk-button-primary'
  const BUTTON_SECONDARY = 'uk-button-secondary'

  return (
    <CharacterListCard>
      <div>
        <div className="filter">
          <div className="uk-text-small filter-name">Elements</div>
          <div className="uk-button-group">
            {elementsList.map((e, i) => (
              <Button
                key={e}
                className={clsx(
                  !elements.includes(e) && BUTTON_DEFAULT,
                  elements.includes(e) && i % 2 === 0 && BUTTON_PRIMARY,
                  elements.includes(e) && i % 2 !== 0 && BUTTON_SECONDARY,
                  elements.includes(e) && e,
                )}
                onClick={() => {
                  updateFilter(ELEMENT, e)
                }}
              >
                {e}
              </Button>
            ))}
          </div>
        </div>
        <div className="filter">
          <div className="uk-text-small filter-name">Weapon Type</div>
          <div className="uk-button-group">
            {weaponsList.map((e, i) => (
              <Button
                key={e}
                className={clsx(
                  !weapons.includes(e) && BUTTON_DEFAULT,
                  weapons.includes(e) && i % 2 === 0 && BUTTON_PRIMARY,
                  weapons.includes(e) && i % 2 !== 0 && BUTTON_SECONDARY,
                )}
                onClick={() => {
                  updateFilter(WEAPON, e)
                }}
              >
                {e}
              </Button>
            ))}
          </div>
        </div>
        <div className="filter">
          <div className="uk-text-small filter-name">Rarity</div>
          <div className="uk-button-group">
            <Button
              key="e"
              className={clsx(rarity === 4 ? BUTTON_PRIMARY : BUTTON_DEFAULT)}
              onClick={() => {
                updateFilter(RARITY, 4)
              }}
            >
              4 <AiFillStar />
            </Button>
            <Button
              key="e"
              className={clsx(rarity === 5 ? BUTTON_PRIMARY : BUTTON_DEFAULT)}
              onClick={() => {
                updateFilter(RARITY, 5)
              }}
            >
              5 <AiFillStar />
            </Button>
          </div>
        </div>
        <div className="filter">
          <div className="uk-text-small filter-name">Sort By</div>
          <div className="uk-button-group">
            {sorts.map((e) => (
              <Button
                key={`sort-${e}`}
                className={clsx(
                  sort !== e && BUTTON_DEFAULT,
                  sort === e && BUTTON_SECONDARY,
                )}
                onClick={updateSort(e)}
              >
                {e}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </CharacterListCard>
  )
}

export default CharacterFilter
