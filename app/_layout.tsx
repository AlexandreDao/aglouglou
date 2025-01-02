import { Stack } from 'expo-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store'
import { PersistGate } from 'redux-persist/integration/react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import CocktailDetail, { DetailsRef } from '@/app/details'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import DetailsBottomSheetProvider from '@/contexts/detailsBottomSheet/DetailsBottomSheetProvider'
import { useRef } from 'react'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const queryClient = new QueryClient()

export default function RootLayout() {
  useReactQueryDevTools(queryClient)

  const detailsBottomSheetRef = useRef<DetailsRef>(null)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={styles.container}>
            <BottomSheetModalProvider>
              <DetailsBottomSheetProvider detailsBottomSheetRef={detailsBottomSheetRef}>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
                <CocktailDetail ref={detailsBottomSheetRef}/>
              </DetailsBottomSheetProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </PersistGate>
      </Provider>
  )
}
