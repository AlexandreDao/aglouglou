import { combineReducers, configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '@/store/slices/favoritesSlice'
import { mmkvStorage } from '@/storage/storageAdapter'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const persistConfig = {
  key: 'root', // Key for the persisted state
  storage: mmkvStorage, // Use MMKV storage
}

const rootReducer = combineReducers({
  favorites: favoritesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
