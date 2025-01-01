import FavItem from '@/components/ui/FavItem'
import useCocktailSearchByFirstLetter from '@/hooks/services/useCocktailSearchByFirstLetter'
import { Text, View, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { CocktailSearchDrink, CocktailDetail, CocktailItem, CocktailSearchResult, CocktailLookupResult } from '@/types/Cocktail'
import { FlashList } from "@shopify/flash-list";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default function Index() {
  const {data, isLoading, error, fetchNextPage, isRefetching, refetch} = useCocktailSearchByFirstLetter()
  const cocktailList = data?.pages.flat() || []
// console.log(JSON.stringify(data?.pages, null, 4))

return (
    <View style={styles.container}>
      {
        isLoading 
        ? (
            <View style={styles.activityContainer}>
              <ActivityIndicator /> 
            </View>
          )
        : (
            <FlashList
              onRefresh={refetch}
              refreshing={isRefetching}
              estimatedItemSize={20}
              keyExtractor={(item) => item.id}
              data={cocktailList} 
              renderItem={({item}) => {
                return <FavItem name={item.name} img={item.thumbnail} />
              }}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (data && data.pages.length < 25) {
                  fetchNextPage()
                }
              }}
            />
          )
        }
    </View>
  )
}
