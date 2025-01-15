import React, { useRef, forwardRef, useState, useEffect, useMemo, memo } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, BackHandler } from 'react-native'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { CocktailDetail } from '@/types/cocktail'
import { Image } from 'expo-image'
import { capitalizeFirstLetter } from '@/utils/stringUtils'
import { BACKGROUND_COLOR, INACTIVE_COLOR, TEXT_COLOR } from '@/constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
  fallback: {
    color: TEXT_COLOR,
    fontSize: 14,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  bottomSheetBackground: {
    backgroundColor: BACKGROUND_COLOR,
  },
  bottomSheetHandleIndicator: {
    backgroundColor: INACTIVE_COLOR,
  },
})

const Details = forwardRef((props, ref) => {
  const bottomSheetModalRef = useRef<BottomSheet>(null)
  const [cocktailDetail, setCocktailDetail] = useState<CocktailDetail | null>(null)
  const ingredients = cocktailDetail?.ingredients.filter((instruction) => instruction.trim()) || []
  const instructions = cocktailDetail?.instructions.split(/[,.]/).filter((instruction) => instruction.trim()) || []
  const insets = useSafeAreaInsets()
  const { height: windowHeight } = useWindowDimensions()

  const snapPoints = useMemo(() => [windowHeight - insets.top], [windowHeight, insets.top])

  React.useImperativeHandle(ref, () => ({
    open: (detail: CocktailDetail) => {
      setCocktailDetail(detail)
      bottomSheetModalRef.current?.expand()
    },
    close: () => bottomSheetModalRef.current?.close(),
  }))

  useEffect(() => {
    const backAction = () => {
      bottomSheetModalRef.current?.close()
      return true
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove()
  }, [])

  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetHandleIndicator}
      enablePanDownToClose
      index={-1}
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        {cocktailDetail && (
          <>
            <Image style={styles.image} source={cocktailDetail.thumbnail} contentFit="cover" allowDownscaling />
            <View style={styles.textContainer}>
              <Text style={styles.h1}>{cocktailDetail.name}</Text>
              <Text style={styles.h2}>Ingredients</Text>
              {ingredients.length ? (
                <Text style={styles.regular}>
                  {ingredients.map((ingredient, index) => {
                    return <Text key={`ingredient-${index}`}>{`• ${ingredient.trim()}\n`}</Text>
                  })}
                </Text>
              ) : (
                <Text style={styles.fallback}>No ingredients</Text>
              )}
              <Text style={styles.h2}>Instructions</Text>
              {instructions.length ? (
                <Text style={styles.regular}>
                  {instructions.map((instruction, index) => {
                    return (
                      <Text key={`instruction-${index}`}>{`• ${capitalizeFirstLetter(instruction.trim())}\n`}</Text>
                    )
                  })}
                </Text>
              ) : (
                <Text style={styles.fallback}>No instructions</Text>
              )}
            </View>
          </>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  )
})

Details.displayName = 'Details'

export default memo(Details)
