import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import searchIcon from '../assets/search.png'
import cloudlySkyIcon from '../assets/clear-sky.png'
import lightRainIcon from '../assets/rain.png'
import HeavyRainIcon from '../assets/rainy.png'
import snowIcon from '../assets/snow.png'
import sunIcon from '../assets/sun.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'

const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false)

  const allIcons = {
    '01d': sunIcon,
    '01n': sunIcon,
    '02d': cloudlySkyIcon,
    '02n': cloudlySkyIcon,
    '03d': cloudlySkyIcon,
    '03n': cloudlySkyIcon,
    '04d': lightRainIcon,
    '04n': lightRainIcon,
    '09d': HeavyRainIcon,
    '09n': HeavyRainIcon,
    '10d': HeavyRainIcon,
    '10n': HeavyRainIcon,
    '13d': snowIcon,
    '13n': snowIcon
  }

  const search = async city => {
    if (city === '') {
      alert('Enter City Name')
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`
      const res = await fetch(url)
      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
        return
      }

      console.log(data)

      const icon = allIcons[data.weather[0].icon] || sunIcon

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      setWeatherData(false)
      console.error('Error fetching weather data')
    }
  }

  useEffect(() => {
    search('Piraeus')
  }, [])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search' />
        <img
          src={searchIcon}
          alt=''
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt='' className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidityIcon} alt='' />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={windIcon} alt='' />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Weather
