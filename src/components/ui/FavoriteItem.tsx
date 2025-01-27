import { Text, StyleSheet, Alert, Pressable } from 'react-native'
import React, { RefObject, useEffect } from 'react'
import { Image } from 'expo-image'
import useFavoriteStore from '@/store/favoritesStore'
import { CocktailDetail } from '@/types/cocktail'
import { BACKGROUND_COLOR, TEXT_COLOR } from '@/constants/colors'
import FavoriteButton from '@/components/ui/FavoriteButton'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useDetailsBottomSheet } from '@/hooks/useDetailsBottomSheet'
import { FlashList } from '@shopify/flash-list'

interface FavItemProps {
  item: CocktailDetail
  isFavorite: boolean
  shouldAnimateRemove?: boolean
  listRef?: RefObject<FlashList<CocktailDetail>>
}

const blurhash = 'LKN]Rv%2Tw=w]~RBVZRi};RPxuwH'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingLeft: 16,
  },
  empty: {},
  image: {
    borderRadius: 14,
    height: 100,
    width: 100,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: TEXT_COLOR,
    flex: 1,
  },
})

function FavoriteItem({ item, isFavorite, listRef, shouldAnimateRemove = false }: FavItemProps) {
  const addToFavorite = useFavoriteStore((state) => state.addToFavorite)
  const removeFromFavorite = useFavoriteStore((state) => state.removeFromFavorite)
  const { open } = useDetailsBottomSheet()
  const height = useSharedValue(100)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    }
  })

  const handleRemove = () => {
    removeFromFavorite(item.id)
  }

  const onPressRemove = () => {
    if (shouldAnimateRemove) {
      listRef?.current?.prepareForLayoutAnimationRender()
      height.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(handleRemove)()
      })
    } else {
      handleRemove()
    }
  }

  const onPress = () => open(item)

  useEffect(() => {
    // Reset value when id changes (view was recycled for another item)
    height.value = 100
  }, [item.id, height])

  return (
    <Pressable
      style={({ pressed }) => {
        if (pressed) {
          return styles.pressed
        }
        return styles.empty
      }}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.6)' }}
      onPress={onPress}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image
          style={styles.image}
          source={item.thumbnail}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
          allowDownscaling
        />
        <Text style={styles.text}>{item.name}</Text>
        <FavoriteButton
          isFavorite={isFavorite}
          favorite={() => {
            addToFavorite(item)
          }}
          unfavorite={() => {
            Alert.alert('Unfavorite', `Are you sure you want to remove ${item.name} from your favorites ?`, [
              { text: 'CANCEL' },
              {
                text: 'REMOVE',
                onPress: onPressRemove,
              },
            ])
          }}
        />
      </Animated.View>
    </Pressable>
  )
}

export default FavoriteItem
