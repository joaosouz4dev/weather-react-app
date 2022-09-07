/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

import axios from 'axios'

import Loading from '@/Components/Loading'
import SearchBar from '@/Components/SearchBar'
import WeatherInfo from '@/Components/WeatherInfo'

const { VITE_APIKEY } = import.meta.env

export const API_KEY = VITE_APIKEY

function isEmpty(obj: { constructor?: object }) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

const callWeather = async (pLa: string, pLo: string) => {
  return await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${pLa}&lon=${pLo}&exclude={part}&appid=${API_KEY}&lang=pt_br&units=metric`,
    )
    .then((resp) => {
      return resp.data
    })
    .then((response) => {
      // set the response to state
      return response
    })
    .catch((err) => {
      return err
    })
}

export const App = () => {
  const [state, setState] = useState({
    city: '',
    loading: false,
    location: {
      la: '',
      lo: '',
    },
    inputWarning: '',
    wdata: {
      coord: {},
    },
  })

  const GetData = () => {
    // settings input warning to false
    setState((old) => ({
      ...old,
      inputWarning: '',
    }))

    // if location is not available
    if (!state.location.la || !state.location.lo) {
      setState((old) => ({
        ...old,
        inputWarning: 'Enter location to continue',
      }))
      return
    }

    // setting loading to true and weather data to {}
    setState((old) => ({
      ...old,
      wdata: {
        coord: {},
      },
      loading: true,
    }))

    // sending GET request
    callWeather(state.location.la, state.location.lo)
      .then((response) => {
        // if any error in request
        if (response.error) {
          setState((old) => ({
            ...old,
            inputWarning: `${response.error.message}`,
            loading: false,
            wdata: {
              coord: {},
            },
          }))
          return
        }
        // set the response to state
        setState((old) => ({
          ...old,
          loading: false,
          wdata: response,
        }))
      })
      .catch((err) => {
        if (err.response && err.response.status === 400 && err.response.data)
          setState((old) => ({
            ...old,
            inputWarning: `${err.response.data.error.message}`,
            loading: false,
          }))
      })
  }

  useEffect(() => {
    /* eslint-env browser */
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // eslint-disable-next-line no-console
        setState((old) => ({
          ...old,
          location: {
            la: pos.coords.latitude.toString(),
            lo: pos.coords.longitude.toString(),
          },
        }))
      })
    }
  }, [])

  useEffect(() => {
    const firstCall = () => {
      // settings input warning to false
      setState((old) => ({
        ...old,
        inputWarning: '',
      }))

      // if location is not available
      if (!state.location.la || !state.location.lo) {
        setState((old) => ({
          ...old,
          inputWarning: 'Enter location to continue',
        }))
        return
      }

      // setting loading to true and weather data to {}
      setState((old) => ({
        ...old,
        wdata: {
          coord: {},
        },
        loading: true,
      }))

      // sending GET request
      callWeather(state.location.la, state.location.lo)
        .then((response) => {
          // if any error in request
          if (response.error) {
            setState((old) => ({
              ...old,
              inputWarning: `${response.error.message}`,
              loading: false,
              wdata: {
                coord: {},
              },
            }))
            return
          }
          // set the response to state
          setState((old) => ({
            ...old,
            loading: false,
            wdata: response,
          }))
        })
        .catch((err) => {
          if (err.response && err.response.status === 400 && err.response.data)
            setState((old) => ({
              ...old,
              inputWarning: `${err.response.data.error.message}`,
              loading: false,
            }))
        })
    }
    if (state.location.la !== '' && state.location.lo !== '') {
      firstCall()
    }
  }, [state.location])

  return (
    <div id="App">
      <div id="main">
        {state.loading ? <Loading /> : []}
        <SearchBar
          location={state.city}
          setLocation={(response: any) =>
            setState((old) => ({
              ...old,
              city: response,
            }))
          }
          setCityWeather={(response: any) => {
            let json = {
              location: {
                la: '',
                lo: '',
              },
              wdata: response,
            }
            if (response.coord.lon && response.coord.lat) {
              json = {
                ...json,
                location: {
                  la: response.coord.lat,
                  lo: response.coord.lon,
                },
              }
            }
            setState((old) => ({
              ...old,
              ...json,
            }))
          }}
        />
        {state.location.la !== '' && state.location.lo !== '' ? (
          <p className="page__info">
            {state.location.la}, {state.location.lo}{' '}
            <button onClick={GetData} type="button" className="reload-weather">
              Atualizar Dados
            </button>
          </p>
        ) : (
          <p className="page__info">Não foi possivel localiza-lo, tente pesquisar acima.</p>
        )}
        {state.inputWarning !== '' ? (
          <div
            style={{
              padding: '5px 1px',
              color: '#a00',
              fontSize: '17px',
              fontWeight: 700,
            }}
          >
            {state.inputWarning}
          </div>
        ) : (
          []
        )}
        {state.wdata && !isEmpty(state.wdata.coord) ? (
          <WeatherInfo cityWeather={state.wdata} />
        ) : (
          []
        )}
      </div>
    </div>
  )
}

export default App
