import { StyleSheet } from 'react-native'
import React from 'react'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { ACTIVE_COLOR, INACTIVE_COLOR } from '@/constants/colors'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { Pressable } from 'react-native-gesture-handler'

interface FavoriteButtonProps {
  isFavorite: boolean
  favorite?: () => void
  unfavorite?: () => void
  size?: number
}

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
})

const FavoriteButton = ({ isFavorite, favorite, unfavorite, size = 32 }: FavoriteButtonProps) => {
  const rotation = useSharedValue(0)
  const yPosition = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }, { translateY: yPosition.value }],
    }
  })

  return (
    <Pressable
      testID="favorite-button"
      style={styles.pressable}
      // Prevent event propagation
      onStartShouldSetResponder={() => true}
      onPress={() => {
        if (isFavorite) {
          unfavorite?.()
        } else {
          if (favorite) {
            rotation.value = withTiming(360, { duration: 600 }, () => {
              rotation.value = 0
            })
            yPosition.value = withSpring(-20, { duration: 600 }, () => {
              yPosition.value = 0
            })
            favorite()
          }
        }
      }}
    >
      <Animated.View style={animatedStyle}>
        <IconSymbol name="star.fill" size={size} color={isFavorite ? ACTIVE_COLOR : INACTIVE_COLOR} />
      </Animated.View>
    </Pressable>
  )
}

export default FavoriteButton
