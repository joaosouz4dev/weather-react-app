import { render, screen } from '@testing-library/react'

// import userEvent from '@testing-library/user-event'
import { SearchBar } from './'

describe('<SearchBar />', () => {
  test('should return the correct text', async () => {
    render(
      <SearchBar
        location={''}
        setLocation={() => {
          return
        }}
        setCityWeather={() => {
          return
        }}
      />,
    )
    const inputSearch = screen.getByPlaceholderText('Pesquise uma cidade, estado ou país:')
    expect(inputSearch).toBeInTheDocument()
  })
  test('should has in the component', async () => {
    render(
      <SearchBar
        location={''}
        setLocation={() => {
          return
        }}
        setCityWeather={() => {
          return
        }}
      />,
    )
    const buttonSearch = screen.getByRole('button')
    expect(buttonSearch).toHaveClass('reload-weather')
    expect(buttonSearch).toBeInTheDocument()
  })
})
