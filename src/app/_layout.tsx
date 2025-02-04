import 'expo-dev-client'
import { Stack } from 'expo-router'
import { QueryClient } from '@tanstack/react-query'
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
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { reactQueryPersistor } from '@/storage/storageAdapter'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  },
})

export default function RootLayout() {
  useReactQueryDevTools(queryClient)

  const detailsBottomSheetRef = useRef<DetailsRef>(null)

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
