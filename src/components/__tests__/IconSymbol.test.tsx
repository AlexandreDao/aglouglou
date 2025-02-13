import React from 'react'
import { render } from '@testing-library/react-native'
import { IconSymbol as IconSymbolAndroid } from '@/components/IconSymbol.android'
import { IconSymbol as IconSymbolIOS } from '@/components/IconSymbol.ios'

describe('<IconSymbol />', () => {
  test('IconSymbol snapshot (Android)', () => {
    const tree = render(<IconSymbolAndroid size={28} name="star.fill" color="white" />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('IconSymbol snapshot (iOS)', () => {
    const tree = render(<IconSymbolIOS size={28} name="star.fill" color="white" />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
