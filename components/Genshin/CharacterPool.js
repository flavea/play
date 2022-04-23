/* eslint-disable no-case-declarations */
import CharacterList from './CharacterList'
import { Grid } from './styled'

export const CharacterPool = ({
  exclusionPool,
  inclusionPool,
  setExclusion,
  sort,
}) => {
  return (
    <Grid className={exclusionPool.length > 0 ? 'yes-grid' : null}>
      <CharacterList
        title="Character Pool"
        characters={inclusionPool}
        text="Click character icon to exclude from character pool"
        setExclusion={setExclusion}
      />
      <CharacterList
        title="Excluded Characters"
        characters={exclusionPool}
        text="Click character icon to put character back into character pool"
        setExclusion={setExclusion}
        opacity={true}
        type={sort ? 'map' : ''}
        sort={sort}
      />
    </Grid>
  )
}

export default CharacterPool
