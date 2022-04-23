import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import genshinsingle from './genshin/single/reducer'
import genshinmulti from './genshin/multi/reducer'
import storage from './sync_storage'

const combinedReducer = combineReducers({
  genshinsingle,
  genshinmulti,
})

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const makeStore = ({ isServer }) => {
  if (isServer) {
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]))
  } else {
    const { persistStore, persistReducer } = require('redux-persist')

    const persistConfig = {
      key: 'flavea',
      whitelist: ['genshinmulti', 'genshinsingle'],
      storage,
    }

    const persistedReducer = persistReducer(persistConfig, combinedReducer)

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware]),
    )

    store.__persistor = persistStore(store)

    return store
  }
}

export const wrapper = createWrapper(makeStore)
