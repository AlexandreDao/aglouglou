import DetailsBottomSheetContext from '@/contexts/detailsBottomSheet/DetailsBottomSheetContext'
import { useContext } from 'react'

export function useDetailsBottomSheet() {
  const context = useContext(DetailsBottomSheetContext)

  if (!context) {
    throw new Error('useDetailsBottomSheet must be used within a DetailsBottomSheetProvider')
  }
  return context
}
