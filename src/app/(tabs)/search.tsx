import { ANDROID_RIPPLE_COLOR, BACKGROUND_COLOR, INACTIVE_COLOR, TEXT_COLOR } from '@/constants/colors'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Keyboard,
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
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'

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
    paddingBottom: Platform.select({ ios: 0, android: 0 }),
  },
  empty: {},
  notFoundText: {
    color: TEXT_COLOR,
    fontSize: 18,
    paddingHorizontal: 16,
  },
  pressed: {
    opacity: 0.8,
  },
  recentSearchContainer: {
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  recentSearchText: {
    color: TEXT_COLOR,
    flex: 1,
    fontSize: 16,
  },
  resultContainer: {
    flex: 1,
  },
  title: {
    color: TEXT_COLOR,
    fontSize: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    <SafeAreaView
      edges={Platform.select({ ios: ['top', 'right', 'left'], android: undefined })}
      style={[styles.container, { paddingBottom: Platform.select({ ios: tabBarHeight, android: 0 }) }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ android: 30, ios: 0 })}
        style={styles.resultContainer}
      >
        <View style={styles.resultContainer}>
          {isInputFocused ? (
            <ScrollView keyboardShouldPersistTaps="always">
              <Text style={styles.title}>Recent search</Text>
              {recentSearches.map((recentSearch, index) => (
                <Pressable
                  key={`recent-search-${index}`}
                  onPress={() => {
                    Keyboard.dismiss()
                    setSearchQuery(recentSearch)
                    setSubmittedQuery(recentSearch)
                    addToRecentSearches(recentSearch)
                  }}
                  style={({ pressed }) => {
                    if (pressed) {
                      return styles.pressed
                    }
                    return styles.empty
                  }}
                  android_ripple={{ color: ANDROID_RIPPLE_COLOR }}
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
          ) : isPlaceholderData ? null : isFetching ? (
            <View style={styles.activityContainer}>
              <ActivityIndicator size="large" color={INACTIVE_COLOR} />
            </View>
          ) : (
            <FlashList
              ref={listRef}
              contentContainerStyle={styles.contentContainer}
              estimatedItemSize={100}
              estimatedListSize={{
                height: windowSize.height - tabBarHeight - insets.top - insets.bottom - 48 - 16, // minus input height and padding
                width: windowSize.width - insets.left - insets.right,
              }}
              keyExtractor={(item) => `search-${submittedQuery}}-${item.id}`}
              data={results}
              renderItem={renderItem}
              ItemSeparatorComponent={Separator}
              ListHeaderComponent={<Text style={styles.title}>Results for "{submittedQuery}"</Text>}
              ListEmptyComponent={() => <Text style={styles.notFoundText}>No result found</Text>}
            />
          )}
        </View>
        <SearchInput
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSubmitEditing={(value) => {
            const sanitizedValue = value.trim()
            setSubmittedQuery(sanitizedValue)
            addToRecentSearches(sanitizedValue)
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
