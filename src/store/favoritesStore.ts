import { zustandStorage } from '@/storage/storageAdapter'
import { CocktailDetail } from '@/types/cocktail'
import { produce } from 'immer'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export interface FavoritesState {
  favorites: CocktailDetail[]
  addToFavorite: (favorite: CocktailDetail) => void
  removeFromFavorite: (favoriteId: string) => void
}

const useFavoritesStore = create<FavoritesState>()(
  devtools(
    persist(
      (set) => ({
        favorites: [],
        addToFavorite: (favorite) =>
          set(
            produce((state: FavoritesState) => {
              if (state.favorites.findIndex((fav) => fav.id === favorite.id) === -1) {
                state.favorites.push(favorite)
              }
            })
          ),
        removeFromFavorite: (favoriteId) =>
          set(
            produce((state: FavoritesState) => {
              const favoriteIndex = state.favorites.findIndex((currentFav) => currentFav.id === favoriteId)

              if (favoriteIndex !== -1) {
                state.favorites.splice(favoriteIndex, 1)
              }
            })
          ),
      }),
      {
        name: 'favoriteStore',
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
)

export default useFavoritesStore
