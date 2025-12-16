import { Persister } from '@tanstack/react-query-persist-client'
import { StateStorage } from 'zustand/middleware'
import { mmkv } from '@/storage'

export const zustandStorage: StateStorage = mmkv

const REACT_QUERY_KEY = 'REACT_QUERY_CACHE'

export const reactQueryPersistor: Persister = {
  persistClient: (client) => {
    return mmkv.setItem(REACT_QUERY_KEY, JSON.stringify(client))
  },
  restoreClient: async () => {
    const cache = (await mmkv.getItem(REACT_QUERY_KEY)) ?? ''

    return cache ? JSON.parse(cache) : undefined
  },
  removeClient: () => {
    return mmkv.removeItem(REACT_QUERY_KEY)
  },
}
