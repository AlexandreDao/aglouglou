import FavoriteItem from '@/components/ui/FavoriteItem'
import { BACKGROUND_COLOR, SEPARATOR_COLOR, TEXT_COLOR } from '@/constants/colors'
import useSortedFavorites from '@/hooks/useSortedFavorites'
import { CocktailDetail } from '@/types/Cocktail'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  separator: {
    height: 1,
    backgroundColor: SEPARATOR_COLOR,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: TEXT_COLOR,
  },
  contentContainer: {
    paddingBottom: 50,
  },
})

export default function Index() {
  const favorites = useSortedFavorites()
  const listRef = useRef<FlashList<CocktailDetail>>(null)

  const renderItem: ListRenderItem<CocktailDetail> = ({ item }) => {
    const isFavorite = favorites.findIndex((favorite) => favorite.id === item.id) !== -1

    return <FavoriteItem shouldAnimateRemove item={item} isFavorite={isFavorite} listRef={listRef} />
  }

  return (
    <SafeAreaView style={styles.container}>
      {favorites.length ? (
        <FlashList
          ref={listRef}
          contentContainerStyle={styles.contentContainer}
          estimatedItemSize={20}
          keyExtractor={(item) => item.id}
          data={favorites}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
