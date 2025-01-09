import { Storage } from 'redux-persist'
import { mmkv } from '@/storage'

// The storage adapter is a simple object that implements the same interface as AsyncStorage.
// From https://github.com/mrousavy/react-native-mmkv/blob/main/docs/WRAPPER_REDUX.md
export const mmkvStorage: Storage = {
  setItem: (key: string, value: string) => {
    mmkv.set(key, value)
    return Promise.resolve(true)
  },
  getItem: (key: string) => {
    const value = mmkv.getString(key)
    return Promise.resolve(value)
  },
  removeItem: (key: string) => {
    mmkv.delete(key)
    return Promise.resolve()
  },
}
