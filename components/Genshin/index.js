import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setDate,
  setFirstTeam,
  setSecondTeam,
} from 'store/genshin-single/action'
import CharacterFilter from './CharacterFilter'
import CharacterList from './CharacterList'
import { Container, Grid } from './styled'

export const Genshin = () => {
  const { firstTeam, secondTeam, date, includedCharacters } = useSelector(
    (state) => state.genshinsingle,
  )
  const dispatch = useDispatch()

  const getRandom = (arr, n) => {
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

  const generateTeam = () => {
    if (includedCharacters.length >= 8) {
      const first = getRandom(includedCharacters, 4)
      const newPool = includedCharacters.filter(
        (c) => !first.find((f) => f.name === c.name),
      )
      const second = getRandom(newPool, 4)
      const generated = new Date().toString()

      dispatch(setFirstTeam(first))
      dispatch(setSecondTeam(second))
      dispatch(setDate(generated))
    } else if (includedCharacters.length > 0 && includedCharacters.length < 8) {
      alert(
        'Can not have less than 8 characters in the pool, please remove some filters',
      )
    }
  }

  useEffect(() => {
    if (
      includedCharacters.length >= 8 &&
      (firstTeam.length < 4 || secondTeam.length < 4)
    ) {
      generateTeam()
    }
  }, [firstTeam, secondTeam])

  return (
    <Container>
      <h3 className="uk-h3 uk-text-bold uk-margin-auto-bottom">
        Random Genshin Teams Generator
      </h3>
      <p className="uk-margin-remove-top uk-margin-small-bottom">
        A tool to generate random genshin teams to be used for fun challenges
      </p>
      <Grid className="yes-grid">
        <CharacterList characters={firstTeam} text="First Team" big={true} />
        <CharacterList characters={secondTeam} text="Second Team" big={true} />
      </Grid>
      <center>
        <p />
        <p>Generated: {date}</p>
        <button
          className="uk-button uk-button-primary"
          onClick={() => {
            generateTeam()
          }}
        >
          Generate New Team
        </button>
      </center>
      <CharacterFilter />
    </Container>
  )
}

export default Genshin
