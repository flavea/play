import { useEffect, useState } from 'react'
import CharacterFilter from './CharacterFilter'
import CharacterList from './CharacterList'
import { Container, Grid } from './styled'

export const Genshin = () => {
  const [availableCharacters, setAvailableCharacters] = useState([])
  const [firstTeam, setFirstTeam] = useState([])
  const [secondTeam, setSecondTeam] = useState([])
  const [generatedDate, setGeneratedDate] = useState('')

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

  const parseItem = (type) => {
    let item = localStorage.getItem(type)
    return item && item.startsWith('[') ? JSON.parse(item) : item || null
  }

  const setItem = (type, value) => {
    localStorage.setItem(type, JSON.stringify(value))
  }

  const generateTeam = () => {
    if (availableCharacters.length >= 8) {
      const firstTeam = getRandom(availableCharacters, 4)
      const newPool = availableCharacters.filter(
        (c) => !firstTeam.find((f) => f.name === c.name),
      )
      const secondTeam = getRandom(newPool, 4)
      const generated = new Date().toString()
      localStorage.setItem('date', generated)
      setItem('firstTeam', firstTeam)
      setItem('secondTeam', secondTeam)
      setFirstTeam(firstTeam)
      setSecondTeam(secondTeam)
      setGeneratedDate(generated)
    } else if (
      availableCharacters.length > 0 &&
      availableCharacters.length < 8
    ) {
      alert(
        'Can not have less than 8 characters in the pool, please remove some filters',
      )
    }
  }

  useEffect(() => {
    if (availableCharacters.length >= 8) {
      const firstTeam = parseItem('firstTeam')
      const secondTeam = parseItem('secondTeam')
      const generated = parseItem('date')

      if (firstTeam?.length) setFirstTeam(firstTeam)
      if (secondTeam?.length) setSecondTeam(secondTeam)
      if (generated) setGeneratedDate(generated)

      if (!firstTeam || !secondTeam) {
        generateTeam()
      }
    }
  }, [availableCharacters])

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
        <p>Generated: {generatedDate}</p>
        <button
          className="uk-button uk-button-primary"
          onClick={() => {
            generateTeam()
          }}
        >
          Generate New Team
        </button>
      </center>
      <CharacterFilter setAvailableCharacters={setAvailableCharacters} />
    </Container>
  )
}

export default Genshin
