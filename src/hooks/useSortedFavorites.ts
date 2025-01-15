import useFavoriteStore, { FavoritesState } from '@/store/favoritesStore'
import { useMemo } from 'react'

const useSortedFavorites = () => {
  const favorites = useFavoriteStore((state: FavoritesState) => state.favorites)
  return useMemo(
    () => [...favorites].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),
    [favorites]
  )
}

export default useSortedFavorites
