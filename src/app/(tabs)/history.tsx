import FavoriteItem from '@/components/ui/FavoriteItem'
import { View, StyleSheet, Text, Platform, useWindowDimensions } from 'react-native'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { BACKGROUND_COLOR, TEXT_COLOR } from '@/constants/colors'
import { CocktailDetail } from '@/types/cocktail'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCallback, useEffect, useRef } from 'react'
import { BottomTabNavigationProp, useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
import { TabParamList } from '@/types/navigation'
import Separator from '@/components/ui/Separator'
import useHistoryStore from '@/store/historyStore'
import { useNavigation } from 'expo-router'

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
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
    fontSize: 18,
  },
})

const History = () => {
  const history = useHistoryStore((state) => state.history)
  const insets = useSafeAreaInsets()
  const tabBarHeight = useBottomTabBarHeight()
  const windowSize = useWindowDimensions()
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>()
  const isFocused = useIsFocused()
  const listRef = useRef<FlashList<CocktailDetail>>(null)

  const renderItem: ListRenderItem<CocktailDetail> = useCallback(({ item }) => {
    return <FavoriteItem item={item} />
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
      {history.length ? (
        <FlashList
          ref={listRef}
          contentContainerStyle={styles.contentContainer}
          estimatedItemSize={100}
          estimatedListSize={{
            height: windowSize.height - tabBarHeight - insets.top - insets.bottom,
            width: windowSize.width - insets.left - insets.right,
          }}
          keyExtractor={(item, index) => `history-${item.id}-${index}`}
          data={history}
          ItemSeparatorComponent={Separator}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.activityContainer}>
          <Text style={styles.fallbackText}>Empty history</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default History
