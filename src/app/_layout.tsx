import 'expo-dev-client'
import { SplashScreen, Stack } from 'expo-router'
import { QueryClient } from '@tanstack/react-query'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CocktailDetail, { DetailsRef } from '@/app/cocktail'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import DetailsBottomSheetProvider from '@/contexts/detailsBottomSheet/DetailsBottomSheetProvider'
import { Fragment, useEffect, useRef, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { BACKGROUND_COLOR } from '@/constants/colors'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { reactQueryPersistor } from '@/storage/storageAdapter'
import * as Font from 'expo-font'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Platform } from 'react-native'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  },
})

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  useReactQueryDevTools(queryClient)

  const [fontsLoaded, setFontsLoaded] = useState(false)
  const detailsBottomSheetRef = useRef<DetailsRef | null>(null)

  useEffect(() => {
    async function prepare() {
      try {
        if (Platform.OS === 'android') {
          await Font.loadAsync({
            ...MaterialIcons.font,
            // add other font
          })
        }
      } catch (error) {
        console.error('Font loading error:', error)
      } finally {
        setFontsLoaded(true)
        SplashScreen.hideAsync()
      }
    }
    prepare()
  }, [])

  if (!fontsLoaded) {
    return null // Keep showing splash screen
  }

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: reactQueryPersistor }}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <DetailsBottomSheetProvider detailsBottomSheetRef={detailsBottomSheetRef}>
            <SafeAreaProvider>
              <KeyboardProvider>
                <Fragment>
                  <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  </Stack>
                  <StatusBar translucent={false} backgroundColor={BACKGROUND_COLOR} style="light" />
                </Fragment>
                <CocktailDetail ref={detailsBottomSheetRef} />
              </KeyboardProvider>
            </SafeAreaProvider>
          </DetailsBottomSheetProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  )
}

export default RootLayout
