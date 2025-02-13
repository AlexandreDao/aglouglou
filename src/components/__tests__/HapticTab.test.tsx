import React from 'react'
import { fireEvent } from '@testing-library/react-native'
import { HapticTab } from '@/components/HapticTab'
import * as Haptics from 'expo-haptics'
import { Platform, View } from 'react-native'
import { renderWithNavigation } from '@/utils/testsUtils'

describe('HapticTab', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('HapticTab snapshot', () => {
    const mockChildren = <View />
    const tree = renderWithNavigation(<HapticTab>{mockChildren}</HapticTab>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('triggers haptic feedback on iOS', () => {
    Platform.OS = 'ios'
    const mockChildren = <View />
    const { getByTestId } = renderWithNavigation(<HapticTab>{mockChildren}</HapticTab>)

    fireEvent(getByTestId('haptic-tab'), 'pressIn')
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light)
  })

  test('does not trigger haptic feedback on Android', () => {
    Platform.OS = 'android'
    const mockChildren = <View />
    const { getByTestId } = renderWithNavigation(<HapticTab>{mockChildren}</HapticTab>)

    fireEvent(getByTestId('haptic-tab'), 'pressIn')
    expect(Haptics.impactAsync).not.toHaveBeenCalled()
  })
})
