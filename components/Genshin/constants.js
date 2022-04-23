import characters from './characters'
export const ELEMENT = 'elements'
export const WEAPON = 'weapons'
export const RARITY = 'rarity'

export const elementsList = [
  'Pyro',
  'Geo',
  'Dendro',
  'Cryo',
  'Electro',
  'Anemo',
  'Hydro',
]
export const weaponsList = ['Sword', 'Claymore', 'Catalyst', 'Polearm', 'Bow']
export const sorts = Object.keys(characters[0]).filter((key) => key !== 'id')
