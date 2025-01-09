import FavoriteItem from '@/components/ui/FavoriteItem'
import useCocktailSearchByFirstLetter from '@/hooks/services/useCocktailSearchByFirstLetter'
import { View, ActivityIndicator, StyleSheet, Text, Platform, useWindowDimensions } from 'react-native'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useAppSelector } from '@/hooks/store/useAppSelector'
import { BACKGROUND_COLOR, INACTIVE_COLOR, TEXT_COLOR } from '@/constants/colors'
import { CocktailDetail } from '@/types/Cocktail'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  loading: {
    padding: 16,
    textAlign: 'center',
    color: TEXT_COLOR,
  },
  fallbackText: {
    color: TEXT_COLOR,
  },
  contentContainer: {
    paddingBottom: Platform.select({ ios: 50, android: 0 }),
  },
  separator: {
    height: 10,
  },
})

export default function Index() {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, isFetching, hasNextPage } =
    useCocktailSearchByFirstLetter()
  const cocktailList = data?.pages.flatMap(({ drinks }) => drinks) || []
  const favorites = useAppSelector((state) => state.favorites)
  const [isFetchingNext, setIsFetchingNext] = useState(false)
  const insets = useSafeAreaInsets()
  const tabBarHeight = useBottomTabBarHeight()
  const windowSize = useWindowDimensions()

  const renderItem: ListRenderItem<CocktailDetail> = ({ item }) => {
    const isFavorite = favorites.findIndex((favorite) => favorite.id === item.id) !== -1

    return <FavoriteItem item={item} isFavorite={isFavorite} />
  }

  useEffect(() => {
    setIsFetchingNext(false)
  }, [isFetchingNextPage])

  if (isLoading) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" color={INACTIVE_COLOR} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {cocktailList.length ? (
        <FlashList
          contentContainerStyle={styles.contentContainer}
          estimatedItemSize={100}
          estimatedListSize={{
            height: windowSize.height - tabBarHeight - insets.top - insets.bottom,
            width: windowSize.width - insets.left - insets.right,
          }}
          keyExtractor={(item) => item.id}
          data={cocktailList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!isFetching && hasNextPage) {
              setIsFetchingNext(true)
              fetchNextPage()
            }
          }}
          ListFooterComponent={isFetchingNext ? <Text style={styles.loading}>Loading more...</Text> : null}
        />
      ) : (
        <View style={styles.activityContainer}>
          <Text style={styles.fallbackText}>Failed to fetch</Text>
        </View>
      )}
    </SafeAreaView>
  )
}
