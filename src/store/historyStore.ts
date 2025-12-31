import { zustandStorage } from '@/storage/storageAdapter'
import { CocktailDetail, CocktailLookupDetail } from '@/types/cocktail'
import { produce } from 'immer'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export interface HistoryState {
  history: CocktailLookupDetail[]
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
              state.history.unshift({ ...cocktail, consultedDate: new Date() })
              state.history.splice(MAX_HISTORY_LENGTH)
            })
          )
        },
      }),
      {
        name: 'recentSearchStore',
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
)

export default useHistoryStore
