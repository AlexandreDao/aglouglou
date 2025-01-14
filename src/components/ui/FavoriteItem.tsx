import { Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { RefObject, useEffect } from 'react'
import { Image } from 'expo-image'
import { useAppDispatch } from '@/hooks/store/useAppDisptach'
import { addToFavorite, removeFromFavorite } from '@/store/slices/favoritesSlice'
import { CocktailDetail } from '@/types/cocktail'
import { TEXT_COLOR } from '@/constants/colors'
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingLeft: 16,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 14,
  },
  text: {
    color: TEXT_COLOR,
    flex: 1,
  },
})

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

function FavoriteItem({ item, isFavorite, listRef, shouldAnimateRemove = false }: FavItemProps) {
  const dispatch = useAppDispatch()
  const { open } = useDetailsBottomSheet()
  const height = useSharedValue(100)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    }
  })

  const handleRemove = () => {
    dispatch(removeFromFavorite(item.id))
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
    <AnimatedPressable style={[styles.container, animatedStyle]} onPress={onPress}>
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
          dispatch(addToFavorite(item))
        }}
        unfavorite={() => {
          Alert.alert(`Are you sure you want to remove ${item.name} from your favorites ?`, '', [
            { text: 'cancel' },
            {
              text: 'Remove',
              onPress: onPressRemove,
            },
          ])
        }}
      />
    </AnimatedPressable>
  )
}

export default FavoriteItem
