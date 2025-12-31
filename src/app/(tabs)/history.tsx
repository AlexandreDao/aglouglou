import FavoriteItem from '@/components/FavoriteItem'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { FlashList, FlashListRef, ListRenderItem } from '@shopify/flash-list'
import { BACKGROUND_COLOR, TEXT_COLOR } from '@/constants/colors'
import { CocktailLookupDetail } from '@/types/cocktail'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useRef } from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
import { TabParamList } from '@/types/navigation'
import Separator from '@/components/Separator'
import useHistoryStore from '@/store/historyStore'
import { useNavigation } from 'expo-router'
import { differenceInCalendarDays, differenceInCalendarMonths, isToday, isYesterday } from 'date-fns'

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
    paddingVertical: Platform.select({ ios: 60, android: 10 }),
  },
  fallbackText: {
    color: TEXT_COLOR,
    fontSize: 18,
  },
  dateTitle: {
    color: TEXT_COLOR,
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 16,
    paddingBottom: 8,
  },
})

const History = () => {
  const history = useHistoryStore((state) => state.history)
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>()
  const isFocused = useIsFocused()
  const listRef = useRef<FlashListRef<CocktailLookupDetail>>(null)
  const headers: string[] = []
  const today = new Date()

  const renderItem: ListRenderItem<CocktailLookupDetail> = ({ item }) => {
    let shownHeader = ''

    if (isToday(item.consultedDate) && !headers.includes('Today')) {
      headers.push('Today')
      shownHeader = 'Today'
    }
    if (isYesterday(item.consultedDate) && !headers.includes('Yesterday')) {
      headers.push('Yesterday')
      shownHeader = 'Yesterday'
    }
    if (
      differenceInCalendarDays(today, item.consultedDate) < 7 &&
      differenceInCalendarDays(today, item.consultedDate) > 1 &&
      !headers.includes('Last week')
    ) {
      headers.push('Last week')
      shownHeader = 'Last week'
    }
    if (
      differenceInCalendarDays(today, item.consultedDate) > 7 &&
      differenceInCalendarMonths(today, item.consultedDate) < 1 &&
      !headers.includes('Last month')
    ) {
      headers.push('Last month')
      shownHeader = 'Last month'
    }
    if (differenceInCalendarMonths(today, item.consultedDate) > 1 && !headers.includes('Older')) {
      headers.push('Older')
      shownHeader = 'Older'
    }
    return (
      <>
        {shownHeader ? <Text style={styles.dateTitle}>{shownHeader}</Text> : null}
        <FavoriteItem item={item} />
      </>
    )
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
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      {history.length ? (
        <FlashList
          ref={listRef}
          contentContainerStyle={styles.contentContainer}
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
