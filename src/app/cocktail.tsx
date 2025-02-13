import React, { useRef, forwardRef, useState, useEffect, useMemo, useImperativeHandle } from 'react'
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  BackHandler,
  NativeEventSubscription,
  Platform,
} from 'react-native'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { CocktailDetail } from '@/types/cocktail'
import { Image } from 'expo-image'
import {
  ACTIVE_COLOR,
  ALCOHOLIC_CATEGORY_COLOR,
  BACKGROUND_COLOR,
  DRINK_CATEGORY_COLOR,
  INACTIVE_COLOR,
  TEXT_COLOR,
} from '@/constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useHistoryStore from '@/store/historyStore'
import { useNavigation } from 'expo-router'
import FavoriteButton from '@/components/FavoriteButton'
import Category from '@/components/Category'
import useFavoritesStore from '@/store/favoritesStore'
import { Checkbox } from 'expo-checkbox'
import useCocktailSearchById from '@/hooks/services/useCocktailSearchById'
import { Pressable } from 'react-native-gesture-handler'

export interface DetailsRef {
  open: (detail?: CocktailDetail | string) => void
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
    fontWeight: 'bold',
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
  instructionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  regular: {
    color: TEXT_COLOR,
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    paddingVertical: Platform.select({ android: 4, ios: 0 }),
  },

  textContainer: {
    gap: 12,
    paddingBottom: 28,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
})

const Cocktail = forwardRef((props, ref) => {
  const bottomSheetModalRef = useRef<BottomSheet>(null)
  const [cocktailDetail, setCocktailDetail] = useState<CocktailDetail | null>(null)
  const [cocktailId, setCocktailId] = useState<string | null>(null)
  const ingredients = cocktailDetail?.ingredients || []
  const instructions = cocktailDetail?.instructions || []
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
  const [isCheckedArray, setIsCheckedArray] = useState<boolean[]>([])
  const { isFetching } = useCocktailSearchById({ id: cocktailId })
  const backAction = () => {
    bottomSheetModalRef.current?.close()
    return true
  }

  useImperativeHandle(ref, () => ({
    open: (cocktail: CocktailDetail) => {
      setCocktailDetail(cocktail)
      const instructionLength = (cocktail?.instructions || []).length
      setIsCheckedArray(new Array(instructionLength).fill(false))

      if (navigationState?.routes[0].state?.routes[navigationState?.routes[0].state?.index ?? 0].name !== 'history') {
        addToHistory(cocktail)
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
                <View>
                  {ingredients.map((ingredient, index) => {
                    return <Text key={`ingredient-${index}`} style={styles.regular}>{`• ${ingredient}\n`}</Text>
                  })}
                </View>
              ) : (
                <Text style={styles.fallback}>No ingredients</Text>
              )}
              <Text style={styles.h2}>Instructions</Text>
              {instructions.length ? (
                <View>
                  {instructions.map((instruction, index) => {
                    return (
                      <Pressable
                        key={`instruction-${index}`}
                        onPress={() => {
                          setIsCheckedArray((prev) => {
                            const tmp = [...prev]
                            tmp[index] = !tmp[index]
                            return tmp
                          })
                        }}
                      >
                        <View style={styles.instructionContainer}>
                          <Text
                            style={[
                              styles.regular,
                              { textDecorationLine: isCheckedArray[index] ? 'line-through' : 'none' },
                            ]}
                          >{`• ${instruction}\n`}</Text>
                          <Checkbox
                            value={isCheckedArray[index]}
                            color={isCheckedArray[index] ? ACTIVE_COLOR : INACTIVE_COLOR}
                          />
                        </View>
                      </Pressable>
                    )
                  })}
                </View>
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

Cocktail.displayName = 'Details'

export default Cocktail
