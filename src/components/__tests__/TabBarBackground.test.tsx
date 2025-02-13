import React from 'react'
import { render } from '@testing-library/react-native'
import BlurTabBarBackgroundAndroid from '@/components/TabBarBackground.android'
import BlurTabBarBackgroundIOS from '@/components/TabBarBackground.ios'

describe('<TabBarBackground />', () => {
  test('TabBarBackground snapshot (Android)', () => {
    expect(BlurTabBarBackgroundAndroid).toBeUndefined()
  })

  test('TabBarBackground snapshot (iOS)', () => {
    const tree = render(<BlurTabBarBackgroundIOS />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
