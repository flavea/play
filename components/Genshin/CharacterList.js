import Image from 'next/image'

import IF from 'components/If'
import { Character, CharacterListCard, CharacterName } from './styled'

import { getCharacters } from 'helpers/genshin'

const classes = {
  4: 'purple',
  5: 'gold',
}
const CharacterList = ({
  characters: charactersProps,
  text,
  title,
  setExclusion,
  opacity,
  big,
  type,
  sort,
}) => {
  let characters = charactersProps
  if (type === 'map' && charactersProps.length) {
    characters = getCharacters(charactersProps, sort)
  }

  const getAlt = (c) => {
    return `${c.name}, a ${
      c.rarity
    } stars ${c.element.toLowerCase()} character wielding a ${c.weapon.toLowerCase()}`
  }
  return (
    <IF condition={characters?.length > 0}>
      <div>
        <h4 className="uk-h5 uk-text-bold">{title}</h4>
        <CharacterListCard>
          <div className="uk-text-small">{text}</div>
          <div className="inner">
            {characters.map((c) => (
              <Character
                key={`${c.id}`}
                className={`uk-border-rounded ${c.element} ${
                  opacity ? 'excluded' : ''
                } ${big ? 'big' : ''}`}
                weapon={c.weapon}
                onClick={() => {
                  if (setExclusion) setExclusion(c)
                  else {
                    window.open(
                      `https://paimon.moe/characters/${c.name
                        .replace(' ', '_')
                        .toLowerCase()}`,
                      '_blank',
                    )
                  }
                }}
                data-uk-tooltip={getAlt(c)}
              >
                <Image
                  src={`/genshin_thumbs/${c.element}_${c.name}.png`}
                  alt={getAlt(c)}
                  width={big ? 130 : 100}
                  height={big ? 130 : 100}
                />
                <CharacterName className={classes[c.rarity] || ''}>
                  {c.name}
                </CharacterName>
              </Character>
            ))}
          </div>
        </CharacterListCard>
      </div>
    </IF>
  )
}

export default CharacterList
