import Session from 'components/Genshin/Multi/Session'
import SEO from 'components/Genshin/SEO'

export const GenshinGeneratorMulti = ({ id }) => {
  return (
    <>
      <SEO />
      <Session id={id} />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { query } = context
  const { id } = query
  return {
    props: {
      id,
    },
  }
}

export default GenshinGeneratorMulti
