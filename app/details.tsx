import React, { useRef, forwardRef, useCallback, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { CocktailDetail } from '@/types/Cocktail'
import { Image } from 'expo-image'
import { capitalizeFirstLetter } from '@/utils/string'
import {
  BACKGROUND_COLOR,
  INACTIVE_COLOR,
  TEXT_COLOR,
} from '@/constants/colors'

export interface DetailsRef {
  open: (detail: CocktailDetail) => void
  close: () => void
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: BACKGROUND_COLOR,
  },
  image: {
    height: 300,
    width: '100%',
  },
  textContainer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 12,
  },
  h1: {
    color: TEXT_COLOR,
    fontSize: 28,
  },
  h2: {
    color: TEXT_COLOR,
    fontSize: 20,
  },
  regular: {
    color: TEXT_COLOR,
    fontSize: 14,
    lineHeight: 24,
  },
})

const Details = forwardRef((props, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const [cocktailDetail, setCocktailDetail] = useState<CocktailDetail | null>(
    null
  )

  React.useImperativeHandle(ref, () => ({
    open: (detail: CocktailDetail) => {
      setCocktailDetail(detail)
      bottomSheetModalRef.current?.present(detail)
    },
    close: () => bottomSheetModalRef.current?.dismiss(),
  }))

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={['95%']}
      enableDynamicSizing={false}
      backgroundStyle={{ backgroundColor: BACKGROUND_COLOR }}
      handleIndicatorStyle={{ backgroundColor: INACTIVE_COLOR }}
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        {cocktailDetail && (
          <>
            <Image
              style={styles.image}
              source={cocktailDetail.thumbnail}
              contentFit="cover"
              allowDownscaling
            />
            <View style={styles.textContainer}>
              <Text style={styles.h1}>{cocktailDetail.name}</Text>
              <Text style={styles.h2}>Ingredients</Text>
              <Text style={styles.regular}>
                {cocktailDetail.ingredients.map((ingredient, index) => {
                  return (
                    <Text key={`ingredient-${index}`}>
                      {`• ${ingredient}\n`}
                    </Text>
                  )
                })}
              </Text>
              <Text style={styles.h2}>Instructions</Text>
              <Text style={styles.regular}>
                {cocktailDetail.instructions
                  .split(/[,.]/)
                  .filter((instruction) => instruction.trim())
                  .map((instruction, index) => {
                    return (
                      <Text
                        key={`instruction-${index}`}
                      >{`• ${capitalizeFirstLetter(instruction.trim())}\n`}</Text>
                    )
                  })}
              </Text>
            </View>
          </>
        )}
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
})

export default Details
