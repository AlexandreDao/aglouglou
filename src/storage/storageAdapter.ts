import { mmkv } from '@/storage'
import { Persister } from '@tanstack/react-query-persist-client'
import { StateStorage } from 'zustand/middleware'

// from https://github.com/mrousavy/react-native-mmkv/blob/main/docs/WRAPPER_ZUSTAND_PERSIST_MIDDLEWARE.md
export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return mmkv.set(name, value)
  },
  getItem: (name) => {
    const value = mmkv.getString(name)
    return value ?? null
  },
  removeItem: (name) => {
    return mmkv.delete(name)
  },
}

const REACT_QUERY_KEY = 'REACT_QUERY_CACHE'

export const reactQueryPersistor: Persister = {
  persistClient: (client) => {
    mmkv.set(REACT_QUERY_KEY, JSON.stringify(client))
  },
  restoreClient: () => {
    const cache = mmkv.getString(REACT_QUERY_KEY)
    return Promise.resolve(cache ? JSON.parse(cache) : undefined)
  },
  removeClient: () => {
    mmkv.delete(REACT_QUERY_KEY)
  },
}
