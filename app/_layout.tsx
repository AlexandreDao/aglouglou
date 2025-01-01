import { Stack } from 'expo-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient()

export default function RootLayout() {
  useReactQueryDevTools(queryClient)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </PersistGate>
      </Provider>
  )
}
