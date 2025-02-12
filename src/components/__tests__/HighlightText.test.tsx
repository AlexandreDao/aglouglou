import React from 'react'
import { render } from '@testing-library/react-native'
import HighlightText from '@/components/ui/HighlightText'

describe('<HighlightText />', () => {
  test('HighlightText snapshot', () => {
    const displayedString = 'Hello world'
    const tree = render(<HighlightText textToHighlight="Hello">{displayedString}</HighlightText>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('HighlightText text is highlight', () => {
    const displayedString = 'Hello world'
    const { getByText } = render(<HighlightText textToHighlight="Hello">{displayedString}</HighlightText>)

    expect(getByText('Hello')).toBeDefined()
    expect(getByText('Hello world')).toBeDefined()
  })
})
