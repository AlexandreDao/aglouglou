import { BACKGROUND_COLOR, TEXT_COLOR } from '@/constants/colors'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useEffect, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
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
import { Pressable, ScrollView } from 'react-native-gesture-handler'

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
  },
  recentSearchText: {
    color: TEXT_COLOR,
    fontSize: 16,
    flex: 1,
  },
})

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const recentSearches = useRecentSearchStore((state) => state.recentSearches)
  const addToRecentSearches = useRecentSearchStore((state) => state.addToRecentSearches)
  const { data, isFetching } = useCocktailSearchByName(submittedQuery)
  const results = data?.drinks || []
  const listRef = useRef<FlashList<CocktailDetail>>(null)
  const insets = useSafeAreaInsets()
  const tabBarHeight = useBottomTabBarHeight()
  const windowSize = useWindowDimensions()
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>()
  const isFocused = useIsFocused()

  const renderItem: ListRenderItem<CocktailDetail> = ({ item }) => {
    const isFavorite = results.findIndex((favorite) => favorite.id === item.id) !== -1

    return <FavoriteItem shouldAnimateRemove item={item} isFavorite={isFavorite} listRef={listRef} />
  }

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
      <View style={styles.resultContainer}>
        {isInputFocused && searchQuery.trim().length > 0 ? (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView>
              <Text style={styles.title}>Recent search</Text>
              {recentSearches.map((recentSearch, index) => (
                <Pressable
                  key={`recent-search-${index}`}
                  onPress={() => {
                    setSearchQuery(recentSearch)
                    setSubmittedQuery(recentSearch)
                    Keyboard.dismiss()
                  }}
                  style={styles.recentSearchContainer}
                >
                  <IconSymbol name="timer" color={TEXT_COLOR} />
                  <Text ellipsizeMode="tail" style={styles.recentSearchText} numberOfLines={1}>
                    {recentSearch}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <FlashList
            ListHeaderComponent={<Text style={styles.title}>Results</Text>}
            ref={listRef}
            contentContainerStyle={styles.contentContainer}
            estimatedItemSize={100}
            estimatedListSize={{
              height: windowSize.height - tabBarHeight - insets.top - insets.bottom,
              width: windowSize.width - insets.left - insets.right,
            }}
            keyExtractor={(item) => item.id}
            data={results}
            ItemSeparatorComponent={Separator}
            renderItem={renderItem}
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
