import FavoriteItem from '@/components/ui/FavoriteItem'
import useCocktailSearchByFirstLetter from '@/hooks/services/useCocktailSearchByFirstLetter'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useAppSelector } from '@/hooks/store/useAppSelector'
import { BACKGROUND_COLOR, INACTIVE_COLOR, SEPARATOR_COLOR, TEXT_COLOR } from '@/constants/colors'
import { CocktailDetail } from '@/types/Cocktail'
import { SafeAreaView } from 'react-native-safe-area-context'

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
})

export default function Index() {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, isFetching } = useCocktailSearchByFirstLetter()
  const cocktailList = data?.pages.flatMap(({ drinks }) => drinks) || []
  const favorites = useAppSelector((state) => state.favorites)

  const renderItem: ListRenderItem<CocktailDetail> = ({ item }) => {
    const isFavorite = favorites.findIndex((favorite) => favorite.id === item.id) !== -1

    return <FavoriteItem item={item} isFavorite={isFavorite} />
  }
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator color={INACTIVE_COLOR} />
        </View>
      ) : (
        <FlashList
          ListEmptyComponent={
            <View style={styles.activityContainer}>
              <Text>Failed to fetch</Text>
            </View>
          }
          estimatedItemSize={20}
          keyExtractor={(item) => item.id}
          data={cocktailList}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: SEPARATOR_COLOR }} />}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!isFetching) {
              fetchNextPage()
            }
          }}
          ListFooterComponent={isFetchingNextPage ? <Text style={styles.loading}>Loading more...</Text> : null}
        />
      )}
    </SafeAreaView>
  )
}
