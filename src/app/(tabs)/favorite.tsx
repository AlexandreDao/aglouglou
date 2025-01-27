import FavoriteItem from '@/components/ui/FavoriteItem'
import { BACKGROUND_COLOR, TEXT_COLOR } from '@/constants/colors'
import useSortedFavorites from '@/hooks/useSortedFavorites'
import { CocktailDetail } from '@/types/cocktail'
import { BottomTabNavigationProp, useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useCallback, useEffect, useRef } from 'react'
import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { TabParamList } from '@/types/navigation'
import Separator from '@/components/ui/Separator'

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Platform.select({ ios: 60, android: 10 }),
  },
  fallbackText: {
    color: TEXT_COLOR,
  },
})

export default function Index() {
  const favorites = useSortedFavorites()
  const listRef = useRef<FlashList<CocktailDetail>>(null)
  const insets = useSafeAreaInsets()
  const tabBarHeight = useBottomTabBarHeight()
  const windowSize = useWindowDimensions()
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>()
  const isFocused = useIsFocused()

  const renderItem: ListRenderItem<CocktailDetail> = useCallback(({ item }) => {
    return <FavoriteItem shouldAnimateRemove item={item} isFavorite listRef={listRef} />
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      if (isFocused) {
        listRef.current?.scrollToOffset({ animated: false, offset: 0 })
      }
    })

    return unsubscribe
  }, [navigation, isFocused])

  return (
    <SafeAreaView style={styles.container}>
      {favorites.length ? (
        <FlashList
          ref={listRef}
          contentContainerStyle={styles.contentContainer}
          estimatedItemSize={100}
          estimatedListSize={{
            height: windowSize.height - tabBarHeight - insets.top - insets.bottom,
            width: windowSize.width - insets.left - insets.right,
          }}
          keyExtractor={(item) => `favorite-${item.id}`}
          data={favorites}
          ItemSeparatorComponent={Separator}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.activityContainer}>
          <Text style={styles.fallbackText}>Empty favorite</Text>
        </View>
      )}
    </SafeAreaView>
  )
}
