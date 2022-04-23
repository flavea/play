import Genshin from 'components/Genshin'
import SEO from 'components/Genshin/SEO'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from 'store/store'

export const GenshinGenerator = () => {
  const store = useStore((state) => state)
  return (
    <>
      <SEO title="Singleplayer" />
      {process.browser ? (
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          <Genshin />
        </PersistGate>
      ) : (
        <PersistGate persistor={store}>
          <Genshin />
        </PersistGate>
      )}
    </>
  )
}

export default wrapper.withRedux(GenshinGenerator)
