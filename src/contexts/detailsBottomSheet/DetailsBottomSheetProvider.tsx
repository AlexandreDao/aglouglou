import React, { useCallback } from 'react'
import DetailsBottomSheetContext from '@/contexts/detailsBottomSheet/DetailsBottomSheetContext'
import { CocktailDetail } from '@/types/cocktail'
import { DetailsRef } from '@/app/cocktail'

interface DetailBottomSheetProviderProps {
  children: React.ReactNode
  detailsBottomSheetRef: React.RefObject<DetailsRef>
}

const DetailsBottomSheetProvider = ({ children, detailsBottomSheetRef }: DetailBottomSheetProviderProps) => {
  const open = useCallback(
    (detail: CocktailDetail) => {
      detailsBottomSheetRef.current?.open(detail)
    },
    [detailsBottomSheetRef]
  )

  const close = useCallback(() => {
    detailsBottomSheetRef.current?.close()
  }, [detailsBottomSheetRef])

  return <DetailsBottomSheetContext.Provider value={{ open, close }}>{children}</DetailsBottomSheetContext.Provider>
}

export default DetailsBottomSheetProvider
