import Session from 'components/Genshin/Multi/Session'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from 'store/store'

export const GenshinGeneratorMulti = ({ id }) => {
  const store = useStore((state) => state)
  return process.browser ? (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Session id={id} />
    </PersistGate>
  ) : (
    <PersistGate persistor={store}>
      <Session id={id} />
    </PersistGate>
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

export default wrapper.withRedux(GenshinGeneratorMulti)
