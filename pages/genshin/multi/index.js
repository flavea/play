import GenshinMulti from 'components/Genshin/Multi'
import SEO from 'components/Genshin/SEO'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from 'store/store'

export const GenshinGeneratorMulti = () => {
  const store = useStore((state) => state)
  return (
    <>
      <SEO title="Multiplayer Mode" />
      {process.browser ? (
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          <GenshinMulti />
        </PersistGate>
      ) : (
        <PersistGate persistor={store}>
          <GenshinMulti />
        </PersistGate>
      )}
    </>
  )
}

export default wrapper.withRedux(GenshinGeneratorMulti)
