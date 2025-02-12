import '@testing-library/jest-native/extend-expect'
import 'react-native-gesture-handler/jestSetup'
import '@shopify/flash-list/jestSetup'
import { setUpTests } from 'react-native-reanimated'

setUpTests()

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  Reanimated.default.call = () => {}

  return Reanimated
})

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn().mockReturnValue(true),
  isLoading: jest.fn().mockReturnValue(false),
  processFontFamily: jest.fn().mockImplementation((font) => font),
}))

jest.mock('expo-speech-recognition', () => ({
  requestPermissions: jest.fn().mockResolvedValue(true),
  startRecording: jest.fn(),
  stopRecording: jest.fn(),
  isAvailable: true,
}))
