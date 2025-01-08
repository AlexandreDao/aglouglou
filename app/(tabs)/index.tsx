import FavoriteItem from '@/components/ui/FavoriteItem'
import useCocktailSearchByFirstLetter from '@/hooks/services/useCocktailSearchByFirstLetter'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useAppSelector } from '@/hooks/store/useAppSelector'
import { BACKGROUND_COLOR, INACTIVE_COLOR, SEPARATOR_COLOR, TEXT_COLOR } from '@/constants/colors'
import { CocktailDetail } from '@/types/Cocktail'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: 50,
  },
})

export default function Index() {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, isFetching, hasNextPage, failureReason } =
    useCocktailSearchByFirstLetter()
  const cocktailList = data?.pages.flatMap(({ drinks }) => drinks) || []
  const favorites = useAppSelector((state) => state.favorites)
  const [isFetchingNext, setIsFetchingNext] = useState(false)
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
        <ActivityIndicator color={INACTIVE_COLOR} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {cocktailList.length ? (
        <FlashList
          contentContainerStyle={styles.contentContainer}
          estimatedItemSize={20}
          keyExtractor={(item) => item.id}
          data={cocktailList}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: SEPARATOR_COLOR }} />}
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
