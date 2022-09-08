import WeatherDetails from '../WeatherDetails'
import './style.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WeatherInfo = (props: { cityWeather: any }) => {
  const cityWeather = props.cityWeather
  const msToKmh = (ms: number) => {
    return parseInt(((ms * (60 * 60)) / 1000).toString())
  }
  return (
    <section className="card">
      <div className="city__container">
        {cityWeather.main && (
          <div className="city__temp__container">
            {cityWeather.weather && (
              <img
                className="city__weather--icon"
                src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
            )}
            <div className="city__temp">
              <p className="city__temp--headline"> {Math.round(cityWeather.main.temp)}º </p>
            </div>
            <div className="city__temp--span">
              <span>Sensação térmica: {Math.round(cityWeather.main.feels_like)}º</span>
              {cityWeather.clouds && <span>Chuva: {cityWeather.clouds.all}%</span>}
              <span>Umidade: {Math.round(cityWeather.main.humidity)}%</span>
              {cityWeather.wind && <span>Vento: {msToKmh(cityWeather.wind.speed)} km/h</span>}
            </div>
          </div>
        )}
        {cityWeather.sys && (
          <div className="city__name">
            <span className="city__name__name">
              {cityWeather.name} <span className="city__country">({cityWeather.sys.country})</span>
            </span>
            {cityWeather.weather && (
              <div className="city__name__weather--desc">
                {' '}
                {cityWeather.weather[0].description}{' '}
              </div>
            )}
          </div>
        )}
      </div>

      <WeatherDetails cityWeather={cityWeather} />
    </section>
  )
}

export default WeatherInfo
