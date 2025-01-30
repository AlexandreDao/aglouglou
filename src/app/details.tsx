import React, { useRef, forwardRef, useState, useEffect, useMemo, useImperativeHandle } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, BackHandler, NativeEventSubscription } from 'react-native'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { CocktailDetail } from '@/types/cocktail'
import { Image } from 'expo-image'
import { capitalizeFirstLetter } from '@/utils/stringUtils'
import {
  ALCOHOLIC_CATEGORY_COLOR,
  BACKGROUND_COLOR,
  DRINK_CATEGORY_COLOR,
  INACTIVE_COLOR,
  TEXT_COLOR,
} from '@/constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useHistoryStore from '@/store/historyStore'
import { useNavigation } from 'expo-router'
import FavoriteButton from '@/components/ui/FavoriteButton'
import Category from '@/components/ui/Category'
import useFavoritesStore from '@/store/favoritesStore'

export interface DetailsRef {
  open: (detail: CocktailDetail) => void
  close: () => void
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: BACKGROUND_COLOR,
  },
  bottomSheetHandleIndicator: {
    backgroundColor: INACTIVE_COLOR,
  },
  categoryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 10,
  },
  contentContainer: {
    backgroundColor: BACKGROUND_COLOR,
  },
  fallback: {
    color: TEXT_COLOR,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  h1: {
    color: TEXT_COLOR,
    flex: 1,
    fontSize: 28,
  },
  h2: {
    color: TEXT_COLOR,
    fontSize: 20,
  },
  headerContainer: {
    gap: 4,
  },
  image: {
    height: 300,
    width: '100%',
  },
  regular: {
    color: TEXT_COLOR,
    fontSize: 14,
    lineHeight: 24,
  },

  textContainer: {
    gap: 12,
    paddingBottom: 28,
    paddingHorizontal: 16,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
})

const Details = forwardRef((props, ref) => {
  const bottomSheetModalRef = useRef<BottomSheet>(null)
  const [cocktailDetail, setCocktailDetail] = useState<CocktailDetail | null>(null)
  const ingredients = cocktailDetail?.ingredients.filter((instruction) => instruction.trim()) || []
  const instructions = cocktailDetail?.instructions.split(/[.]/).filter((instruction) => instruction.trim()) || []
  const insets = useSafeAreaInsets()
  const { height: windowHeight } = useWindowDimensions()
  const backHandler = useRef<NativeEventSubscription>()
  const snapPoints = useMemo(() => [windowHeight - insets.top], [windowHeight, insets.top])
  const addToHistory = useHistoryStore((state) => state.addToHistory)
  const navigationState = useNavigation().getState()
  const favorites = useFavoritesStore((state) => state.favorites)
  const isFavorite = favorites.findIndex((favorite) => favorite.id === cocktailDetail?.id) !== -1
  const addToFavorite = useFavoritesStore((state) => state.addToFavorite)
  const removeFromFavorite = useFavoritesStore((state) => state.removeFromFavorite)

  const backAction = () => {
    bottomSheetModalRef.current?.close()
    return true
  }

  useImperativeHandle(ref, () => ({
    open: (detail: CocktailDetail) => {
      setCocktailDetail(detail)
      if (navigationState?.routes[0].state?.routes[navigationState?.routes[0].state?.index ?? 0].name !== 'history') {
        addToHistory(detail)
      }
      bottomSheetModalRef.current?.expand()
    },
    close: () => bottomSheetModalRef.current?.close(),
  }))

  useEffect(() => {
    return () => backHandler.current?.remove()
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
      onChange={(index) => {
        if (index === 0) {
          backHandler.current = BackHandler.addEventListener('hardwareBackPress', backAction)
        } else {
          backHandler.current?.remove()
        }
      }}
    >
      <BottomSheetScrollView style={styles.contentContainer} keyboardShouldPersistTaps="always">
        {cocktailDetail && (
          <>
            <Image style={styles.image} source={cocktailDetail.thumbnail} contentFit="cover" allowDownscaling />
            <View style={styles.textContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.h1}>{cocktailDetail.name}</Text>
                  <FavoriteButton
                    size={40}
                    isFavorite={isFavorite}
                    favorite={() => addToFavorite(cocktailDetail)}
                    unfavorite={() => {
                      removeFromFavorite(cocktailDetail.id)
                    }}
                  />
                </View>
                <View style={styles.categoryContainer}>
                  {cocktailDetail.alcoholic && (
                    <Category title={cocktailDetail.alcoholic} backgroundColor={ALCOHOLIC_CATEGORY_COLOR} />
                  )}
                  {cocktailDetail.category && (
                    <Category title={cocktailDetail.category} backgroundColor={DRINK_CATEGORY_COLOR} />
                  )}
                </View>
              </View>
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

export default Details
