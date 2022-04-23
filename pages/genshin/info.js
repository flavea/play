import SEO from 'components/Genshin/SEO'
import Setting from 'components/Genshin/Setting'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from 'store/store'

export const GenshinGenerator = () => {
  const store = useStore((state) => state)
  return (
    <>
      <SEO title="Info and Back Up Data" />
      {process.browser ? (
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          <Setting />
        </PersistGate>
      ) : (
        <PersistGate persistor={store}>
          <Setting />
        </PersistGate>
      )}
    </>
  )
}

export default wrapper.withRedux(GenshinGenerator)
