import React from 'react'
import SearchInput from '@/components/SearchInput'
import { fireEvent, render } from '@testing-library/react-native'

describe('<SearchInput />', () => {
  test('SearchInput snapshot', () => {
    const tree = render(<SearchInput />).toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('SearchInput searchQuery', () => {
    const searchQuery = 'Hello world'
    const { getByDisplayValue } = render(<SearchInput searchQuery={searchQuery} />)

    expect(getByDisplayValue(searchQuery)).toBeDefined()
  })
  test('SearchInput focus', () => {
    const onFocusMock = jest.fn()
    const { getByTestId } = render(<SearchInput onFocus={onFocusMock} />)

    fireEvent(getByTestId('search-input'), 'focus')
    expect(onFocusMock).toHaveBeenCalled()
  })
  test('SearchInput onSubmit', () => {
    const text = 'Hello world'
    const onSubmitMock = jest.fn()
    const { getByTestId } = render(<SearchInput onSubmitEditing={onSubmitMock} />)
    const input = getByTestId('search-input')

    fireEvent.changeText(input, text)
    fireEvent(input, 'submitEditing', { nativeEvent: { text } })
    expect(onSubmitMock).toHaveBeenCalled()
  })
})
