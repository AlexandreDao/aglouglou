import { RootState } from '@/store'
import { createSelector } from 'reselect'
import { useAppSelector } from '@/hooks/store/useAppSelector'

const selectFavorites = (state: RootState) => state.favorites

const selectSortedFavorites = createSelector([selectFavorites], (favorites) =>
  [...favorites].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
)

const useSortedFavorites = () => useAppSelector(selectSortedFavorites)

export default useSortedFavorites
