import { Text, StyleSheet, Pressable, Alert } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useAppDispatch } from '@/hooks/store/useAppDisptach'
import {
  addToFavorite,
  removeFromFavorite,
} from '@/store/slices/favoritesSlice'
import { CocktailDetail } from '@/types/Cocktail'
import { TEXT_COLOR } from '@/constants/colors'
import FavoriteButton from '@/components/ui/FavoriteButton'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useDetailsBottomSheet } from '@/hooks/useDetailsBottomSheet'

interface FavItemProps {
  item: CocktailDetail
  isFavorite: boolean
  shouldAnimateRemove?: boolean
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    color: TEXT_COLOR,
    flex: 1,
  },
})

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

function FavoriteItem({
  item,
  isFavorite,
  shouldAnimateRemove = false,
}: FavItemProps) {
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
      height.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(handleRemove)()
      })
    } else {
      handleRemove()
    }
  }

  const onPress = () => open(item)

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle]}
      onPress={onPress}
    >
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
          Alert.alert(
            `Are you sure you want to remove ${item.name} from your favorites ?`,
            '',
            [
              { text: 'cancel' },
              {
                text: 'Remove',
                onPress: onPressRemove,
              },
            ]
          )
        }}
      />
    </AnimatedPressable>
  )
}

export default FavoriteItem
