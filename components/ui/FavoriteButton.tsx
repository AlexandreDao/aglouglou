import { Pressable, Alert, StyleSheet } from 'react-native'
import React from 'react'
import { IconSymbol } from './IconSymbol'
import { ACTIVE_COLOR, INACTIVE_COLOR } from '@/constants/colors'
import { CocktailDetail } from '@/types/Cocktail'
import { useAppDispatch } from '@/hooks/store/useAppDisptach'
import { addToFavorite, removeFromFavorite } from '@/store/slices/favoritesSlice'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

interface FavoriteButtonProps {
  isFavorite: boolean
  favorite: () => void
  unfavorite: () => void
}

const styles = StyleSheet.create({
  pressable: {
    padding: 16,
  }
})

function FavoriteButton({isFavorite, favorite, unfavorite}: FavoriteButtonProps) {
  const rotation = useSharedValue(0)
  const yPosition = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }, { translateY: yPosition.value }],
    };
  });

  return (
    <Pressable 
      style={styles.pressable} 
      onPress={() => {
         if (isFavorite) {
            unfavorite()
          }
          else {
            rotation.value = withTiming(360, { duration: 600 }, () => {
              rotation.value = 0;
            })
            yPosition.value = withSpring(-20, { duration: 600 }, () => {
              yPosition.value = 0;
            })
            favorite()
          }
      }}
    >
      <Animated.View style={animatedStyle}>
        <IconSymbol name="star.fill" size={32} color={isFavorite ? ACTIVE_COLOR : INACTIVE_COLOR} />
      </Animated.View>
    </Pressable>
  )
}

export default FavoriteButton