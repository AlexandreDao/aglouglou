import React from 'react'
import { render } from '@testing-library/react-native'
import Category from '@/components/ui/Category'

describe('<Category />', () => {
  test('Category snapshot', () => {
    const tree = render(<Category title="Hello world" />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
