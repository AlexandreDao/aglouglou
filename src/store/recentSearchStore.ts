import { zustandStorage } from '@/storage/storageAdapter'
import { produce } from 'immer'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export interface RecentSearchesState {
  recentSearches: string[]
  addToRecentSearches: (searchQuery: string) => void
}

const MAX_RECENT_SEARCHES = 10

const useRecentSearchStore = create<RecentSearchesState>()(
  devtools(
    persist(
      (set) => ({
        recentSearches: [],
        addToRecentSearches: (searchQuery) => {
          set(
            produce((state: RecentSearchesState) => {
              if (state.recentSearches.includes(searchQuery)) {
                state.recentSearches.splice(state.recentSearches.indexOf(searchQuery), 1)
              }
              state.recentSearches.unshift(searchQuery)
              state.recentSearches.splice(MAX_RECENT_SEARCHES)
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

export default useRecentSearchStore
