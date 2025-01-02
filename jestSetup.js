import '@testing-library/jest-native/extend-expect'
import 'react-native-gesture-handler/jestSetup'
import { setUpTests } from 'react-native-reanimated'

setUpTests()

jest.mock('react-native-reanimated', () => {
  return require('react-native-reanimated/mock')
})
