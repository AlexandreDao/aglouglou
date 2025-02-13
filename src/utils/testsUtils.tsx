import { render } from '@testing-library/react-native'
import { ReactNode } from 'react'
import { NavigationContainer } from '@react-navigation/native'

export const renderWithNavigation = (children: ReactNode) =>
  render(<NavigationContainer>{children}</NavigationContainer>)
