import { useEffect, useState } from 'react'

import axios from 'axios'

import { API_KEY } from '@/App/App'

import './style.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WeatherDetails = (props: { cityWeather: any }) => {
  const cityWeather = props.cityWeather
  const [cityForecast, setCityForecast] = useState({
    daily: [],
  })

  useEffect(() => {
    const fetchForecast = async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${cityWeather.coord.lat}&lon=${cityWeather.coord.lon}&exclude=hourly,minutely,current&appid=${API_KEY}&lang=pt_br&units=metric`,
      )
      setCityForecast(data)
    }

    fetchForecast()
  }, [cityWeather])

  return (
    <section className="forecast">
      {cityForecast.daily?.length > 0 && (
        <>
          <p>Previsão do tempo para a semana:</p>
          <div className="page__forecast">
            {cityForecast.daily &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              cityForecast.daily.map((item: any) => (
                <div key={item.dt} className="page__forecast--item">
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt="Weather icon"
                  />
                  <div className="page__forecast--detail">
                    <p>{Math.round(item.temp.min)}º</p>
                    <p>{Math.round(item.temp.max)}º</p>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  )
}

export default WeatherDetails
