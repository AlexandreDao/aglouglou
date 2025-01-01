import { CocktailDetail } from '@/types/Cocktail'
import { createSlice } from '@reduxjs/toolkit'

const initialState: CocktailDetail[] = []

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    addToFavorite(state, action) {
      state.push(action.payload)
    },
    removeFromFavorite(state, action) {
      const favoriteIndex = state.findIndex(favorite => favorite.id === action.payload)

      if (favoriteIndex !== -1) {
        state.splice(favoriteIndex, 1)
      }
    }
  }
})

export const { addToFavorite, removeFromFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer