import 'expo-dev-client'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CocktailDetail, { DetailsRef } from '@/app/details'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import DetailsBottomSheetProvider from '@/contexts/detailsBottomSheet/DetailsBottomSheetProvider'
import { Fragment, useRef } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { BACKGROUND_COLOR } from '@/constants/colors'
import { KeyboardProvider } from 'react-native-keyboard-controller'

const queryClient = new QueryClient()

export default function RootLayout() {
  useReactQueryDevTools(queryClient)

  const detailsBottomSheetRef = useRef<DetailsRef>(null)

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}
