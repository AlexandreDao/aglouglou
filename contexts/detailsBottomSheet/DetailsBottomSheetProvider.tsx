import React, { useCallback } from 'react'
import DetailsBottomSheetContext from '@/contexts/detailsBottomSheet/DetailsBottomSheetContext'
import { CocktailDetail } from '@/types/Cocktail'
import { DetailsRef } from '@/app/details'

interface DetailBottomSheetProviderProps {
  children: React.ReactNode
  detailsBottomSheetRef: React.RefObject<DetailsRef>
}

function DetailsBottomSheetProvider({
  children,
  detailsBottomSheetRef,
}: DetailBottomSheetProviderProps) {
  const open = useCallback((detail: CocktailDetail) => {
    detailsBottomSheetRef.current?.open(detail)
  }, [])

  const close = useCallback(() => {
    detailsBottomSheetRef.current?.close()
  }, [])

  return (
    <DetailsBottomSheetContext.Provider value={{ open, close }}>
      {children}
    </DetailsBottomSheetContext.Provider>
  )
}

export default DetailsBottomSheetProvider
