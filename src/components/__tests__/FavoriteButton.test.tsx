import FavoriteButton from '@/components/FavoriteButton'
import { NOOP } from '@/constants/function'
import { fireEvent, render } from '@testing-library/react-native'

describe('<FavoriteButton />', () => {
  test('FavoriteButton snapshot', () => {
    const tree = render(<FavoriteButton isFavorite={false} unfavorite={NOOP} favorite={NOOP} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('FavoriteButton press favorite', () => {
    const favoriteMock = jest.fn()
    const unfavoriteMock = jest.fn()
    const { getByTestId } = render(
      <FavoriteButton isFavorite={false} unfavorite={unfavoriteMock} favorite={favoriteMock} />
    )

    fireEvent.press(getByTestId('favorite-button'))
    expect(favoriteMock).toHaveBeenCalled()
    expect(unfavoriteMock).not.toHaveBeenCalled()
  })

  test('FavoriteButton press unfavorite', () => {
    const favoriteMock = jest.fn()
    const unfavoriteMock = jest.fn()
    const { getByTestId } = render(<FavoriteButton isFavorite unfavorite={unfavoriteMock} favorite={favoriteMock} />)

    fireEvent.press(getByTestId('favorite-button'))
    expect(unfavoriteMock).toHaveBeenCalled()
    expect(favoriteMock).not.toHaveBeenCalled()
  })
})
