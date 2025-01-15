import { mmkv } from '@/storage'
import { StateStorage } from 'zustand/middleware'

// The storage adapter is a simple object that implements the same interface as AsyncStorage.
export const mmkvStorage: StateStorage = {
  setItem: (key: string, value: string) => {
    mmkv.set(key, value)
    return Promise.resolve()
  },
  getItem: (key: string) => {
    const value = mmkv.getString(key) || null
    return Promise.resolve(value)
  },
  removeItem: (key: string) => {
    mmkv.delete(key)
    return Promise.resolve()
  },
}
