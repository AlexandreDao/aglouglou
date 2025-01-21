import { BACKGROUND_COLOR, TEXT_COLOR } from '@/constants/colors'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchInput from '@/components/ui/SearchInput'
import useRecentSearchStore from '@/store/recentSearchStore'
import { IconSymbol } from '@/components/ui/IconSymbol'
import useCocktailSearchByName from '@/hooks/services/useCocktailSearchByName'
import { CocktailDetail } from '@/types/cocktail'
import { BottomTabNavigationProp, useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useNavigation } from 'expo-router'
import { TabParamList } from '@/types/navigation'
import { useIsFocused } from '@react-navigation/native'
import FavoriteItem from '@/components/ui/FavoriteItem'
import Separator from '@/components/ui/Separator'
import useFavoritesStore from '@/store/favoritesStore'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  resultContainer: {
    flex: 1,
  },
  title: {
    color: TEXT_COLOR,
    fontSize: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: Platform.select({ ios: 50, android: 0 }),
  },
  recentSearchContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: BACKGROUND_COLOR,
  },
  recentSearchText: {
    color: TEXT_COLOR,
    fontSize: 16,
    flex: 1,
  },
  notFoundText: {
    color: TEXT_COLOR,
    paddingHorizontal: 16,
  },
  empty: {},
  pressed: {
    opacity: 0.8,
  },
})

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const recentSearches = useRecentSearchStore((state) => state.recentSearches)
  const addToRecentSearches = useRecentSearchStore((state) => state.addToRecentSearches)
  const { data, isFetching, isPlaceholderData } = useCocktailSearchByName(submittedQuery)
  const results = data?.drinks ? [...data.drinks] : []
  const favorites = useFavoritesStore((state) => state.favorites)
  const listRef = useRef<FlashList<CocktailDetail>>(null)
  const insets = useSafeAreaInsets()
  const tabBarHeight = useBottomTabBarHeight()
  const windowSize = useWindowDimensions()
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>()
  const isFocused = useIsFocused()

  const renderItem: ListRenderItem<CocktailDetail> = useCallback(
    ({ item }) => {
      const isFavorite = favorites.findIndex((favorite) => favorite.id === item.id) !== -1

      return <FavoriteItem item={item} isFavorite={isFavorite} />
    },
    [favorites]
  )

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      if (isFocused) {
        listRef.current?.scrollToOffset({ animated: false, offset: 0 })
      }
    })

    return unsubscribe
  }, [navigation, isFocused])

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss()
    })

    return () => {
      hideSubscription.remove()
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        {isInputFocused ? (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="always">
              <Text style={styles.title}>Recent search</Text>
              {recentSearches.map((recentSearch, index) => (
                <Pressable
                  key={`recent-search-${index}`}
                  onPress={() => {
                    setSearchQuery(recentSearch)
                    setSubmittedQuery(recentSearch)
                    Keyboard.dismiss()
                  }}
                  style={({ pressed }) => {
                    if (pressed) {
                      return styles.pressed
                    }
                    return styles.empty
                  }}
                  android_ripple={{ color: 'rgba(255, 255, 255, 0.6)' }}
                >
                  <View style={styles.recentSearchContainer}>
                    <IconSymbol name="timer" color={TEXT_COLOR} />
                    <Text ellipsizeMode="tail" style={styles.recentSearchText} numberOfLines={1}>
                      {recentSearch}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </KeyboardAvoidingView>
        ) : isPlaceholderData ? null : (
          <FlashList
            ref={listRef}
            contentContainerStyle={styles.contentContainer}
            estimatedItemSize={100}
            estimatedListSize={{
              height: windowSize.height - tabBarHeight - insets.top - insets.bottom - 48 - 16,
              width: windowSize.width - insets.left - insets.right,
            }}
            keyExtractor={(item) => `search-${submittedQuery}}-${item.id}`}
            data={results}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
            ListHeaderComponent={<Text style={styles.title}>Results</Text>}
            ListEmptyComponent={() => <Text style={styles.notFoundText}>No result found for "{submittedQuery}"</Text>}
          />
        )}
      </View>
      <SearchInput
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmitEditing={(value) => {
          setSubmittedQuery(value)
          addToRecentSearches(value)
        }}
      />
    </SafeAreaView>
  )
}
