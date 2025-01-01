import FavItem from '@/components/ui/FavItem'
import useCocktailSearchByFirstLetter from '@/hooks/services/useCocktailSearchByFirstLetter'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { FlashList } from "@shopify/flash-list";
import { useAppSelector } from '@/hooks/store/useAppSelector';
import { useAppDispatch } from '@/hooks/store/useAppDisptach';
import { addToFavorite, removeFromFavorite } from '@/store/slices/favoritesSlice';

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
  const favorites = useAppSelector(state => state.favorites)
  const dispatch = useAppDispatch()
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
                const isFavorite = favorites.findIndex(favorite => favorite.id === item.id) !== -1
                
                return (
                  <FavItem 
                    name={item.name} 
                    img={item.thumbnail} 
                    isFavorite={isFavorite}
                    onPress={() => {
                      if (isFavorite) {
                        dispatch(removeFromFavorite(item.id))
                      }
                      else {
                        dispatch(addToFavorite(item))
                      }
                    }}
                  />
                )
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
