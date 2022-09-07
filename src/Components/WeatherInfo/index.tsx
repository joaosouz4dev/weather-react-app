import WeatherDetails from '../WeatherDetails'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WeatherInfo = (props: { cityWeather: any }) => {
  const cityWeather = props.cityWeather
  return (
    <section className="card">
      <div className="city__name">
        {cityWeather.sys && (
          <div className="city__name">
            {cityWeather.name} <span className="city__country">({cityWeather.sys.country})</span>
          </div>
        )}
        {cityWeather.weather && (
          <img
            className="city__weather--icon"
            src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        )}
      </div>

      {cityWeather.weather && (
        <p className="city__weather--desc"> {cityWeather.weather[0].description} </p>
      )}

      {cityWeather.main && (
        <div>
          <div className="city__temp">
            <p className="city__temp--headline"> {Math.round(cityWeather.main.temp)}º </p>
          </div>
          <p className="city__temp--span">
            {' '}
            Sensação térmica: {Math.round(cityWeather.main.feels_like)}º{' '}
          </p>
        </div>
      )}

      <WeatherDetails cityWeather={cityWeather} />
    </section>
  )
}

export default WeatherInfo
