import { mmkv } from "@/storage"

// The storage adapter is a simple object that implements the same interface as AsyncStorage.
export const mmkvStorage = {
  setItem: (key: string, value: string) => {
    mmkv.set(key, value);
    return Promise.resolve(true)
  },
  getItem: (key: string) => {
    const value = mmkv.getString(key);
    return Promise.resolve(value)
  },
  removeItem: (key: string) => {
    mmkv.delete(key);
    return Promise.resolve(true)
  },
}