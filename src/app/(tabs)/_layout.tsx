import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, View } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/IconSymbol'
import { ACTIVE_COLOR, INACTIVE_COLOR, TAB_BAR_BACKGROUND_COLOR } from '@/constants/colors'
import BlurTabBarBackground from '@/components/TabBarBackground'
import { BottomTabBar } from '@react-navigation/bottom-tabs'

const TabLayout = () => {
  return (
    <Tabs
      tabBar={(props) => (
        <View testID="bottom-tab-bar">
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={({ route, navigation }) => {
        return {
          //        tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          headerShown: false,
          tabBarButton: (props) => (
            <HapticTab
              {...props}
              accessibilityState={{ selected: navigation.isFocused() }}
              testID={`${route.name}-tab`}
            />
          ),
          tabBarBackground: BlurTabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {
              backgroundColor: TAB_BAR_BACKGROUND_COLOR,
            },
          }),
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="timer" color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
