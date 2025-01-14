import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TAB_BAR_BACKGROUND_COLOR = 'rgba(67, 19, 39, 0.6)'

const styles = StyleSheet.create({
  blurView: {
    backgroundColor: TAB_BAR_BACKGROUND_COLOR,
  },
})

export default function BlurTabBarBackground() {
  return <BlurView intensity={80} style={[StyleSheet.absoluteFill, styles.blurView]} />
}

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight()
  const { bottom } = useSafeAreaInsets()
  return tabHeight - bottom
}
