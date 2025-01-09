import { CocktailDetail } from '@/types/cocktail'
import { createContext } from 'react'
import { NOOP } from '@/constants/function'

const DetailsBottomSheetContext = createContext({
  open: (detail: CocktailDetail) => {},
  close: NOOP,
})

export default DetailsBottomSheetContext
