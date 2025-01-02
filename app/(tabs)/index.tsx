import FavItem from '@/components/ui/FavItem'
import useCocktailSearchByFirstLetter from '@/hooks/services/useCocktailSearchByFirstLetter'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { FlashList } from "@shopify/flash-list";
import { useAppSelector } from '@/hooks/store/useAppSelector';
import { useAppDispatch } from '@/hooks/store/useAppDisptach';
import { addToFavorite, removeFromFavorite } from '@/store/slices/favoritesSlice';
import CocktailDetail from '@/app/details';
import { useBottomSheet, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useDetailsBottomSheet } from '@/hooks/useDetailsBottomSheet';
import { BACKGROUND_COLOR, SEPARATOR_COLOR } from '@/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
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
  const { open } = useDetailsBottomSheet()
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
              ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: SEPARATOR_COLOR}} />}
              renderItem={({item}) => {
                const isFavorite = favorites.findIndex(favorite => favorite.id === item.id) !== -1
                
                return (
                  <FavItem 
                    item={item}
                    isFavorite={isFavorite}
                    onPress={() => {
                      open(item)
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
