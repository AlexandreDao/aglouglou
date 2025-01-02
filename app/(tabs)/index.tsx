import FavoriteItem from '@/components/ui/FavoriteItem'
import useCocktailSearchByFirstLetter from '@/hooks/services/useCocktailSearchByFirstLetter'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useAppSelector } from '@/hooks/store/useAppSelector'
import { BACKGROUND_COLOR, SEPARATOR_COLOR } from '@/constants/colors'

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
})

export default function Index() {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useCocktailSearchByFirstLetter()
  const cocktailList = data?.pages.flat() || []
  const favorites = useAppSelector((state) => state.favorites)

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlashList
          refreshing={isFetchingNextPage}
          estimatedItemSize={20}
          keyExtractor={(item) => item.id}
          data={cocktailList}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: SEPARATOR_COLOR }} />
          )}
          renderItem={({ item }) => {
            const isFavorite =
              favorites.findIndex((favorite) => favorite.id === item.id) !== -1

            return <FavoriteItem item={item} isFavorite={isFavorite} />
          }}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (data && data.pages.length < 25) {
              fetchNextPage()
            }
          }}
        />
      )}
    </View>
  )
}
