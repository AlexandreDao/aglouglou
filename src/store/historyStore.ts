import { mmkvStorage } from '@/storage/storageAdapter'
import { CocktailDetail } from '@/types/cocktail'
import { produce } from 'immer'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export interface HistoryState {
  history: CocktailDetail[]
  addToHistory: (cocktail: CocktailDetail) => void
}

const MAX_HISTORY_LENGTH = 100

const useHistoryStore = create<HistoryState>()(
  devtools(
    persist(
      (set) => ({
        history: [],
        addToHistory: (cocktail) => {
          set(
            produce((state: HistoryState) => {
              if (state.history[0]?.id === cocktail.id) {
                return
              }
              state.history.unshift(cocktail)
              state.history.splice(MAX_HISTORY_LENGTH)
            })
          )
        },
      }),
      {
        name: 'recentSearchStore',
        storage: createJSONStorage(() => mmkvStorage),
      }
    )
  )
)

export default useHistoryStore
