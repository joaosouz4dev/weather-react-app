import axios from 'axios'

import { API_KEY } from '@/App/App'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SearchBar = (props: { location: any; setLocation: any; setCityWeather: any }) => {
  const { location, setLocation, setCityWeather } = props

  const searchLocation = (event?: { key: string }, buscar = false) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=pt_br&units=metric`
    if ((event?.key === 'Enter' || buscar) && location.length > 0) {
      axios.get(URL).then((response) => {
        setCityWeather(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="search">
      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        type="text"
        placeholder="Pesquise uma cidade, estado ou país:"
      />
      <button
        onClick={() => searchLocation(undefined, true)}
        type="button"
        className="reload-weather"
        style={{
          borderRadius: '50%',
          height: '40px',
          width: '40px',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'inline-flex',
          padding: 0,
          marginLeft: '5px',
        }}
      >
        <svg
          width="16"
          height="16"
          className="bi bi-search"
          viewBox="0 0 16 16"
          style={{
            fill: '#ffffff',
          }}
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </button>
    </div>
  )
}

export default SearchBar
