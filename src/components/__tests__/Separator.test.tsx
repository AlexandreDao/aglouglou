import React from 'react'
import { render } from '@testing-library/react-native'
import Separator from '@/components/Separator'

describe('<Separator />', () => {
  test('Separator snapshot', () => {
    const tree = render(<Separator />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
