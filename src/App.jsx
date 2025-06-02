import React, { useEffect, useState } from 'react';
import { getWeatherData } from './api/weather';

import SearchBar from './components/SearchBar';
import TemperatureCard from './components/TemperatureCard';
import WeatherIcon from './components/WeatherIcon';
import LocationInfo from './components/LocationInfo';
import ForecastTabs from './components/ForecastTabs';
import ForecastDayCard from './components/ForecastDayCard';

import UVIndex from './components/Highlights/UVIndex';
import WindStatus from './components/Highlights/WindStatus';
import SunriseSunset from './components/Highlights/SunriseSunset';
import Humidity from './components/Highlights/Humidity';
import Visibility from './components/Highlights/Visibility';
import AirQuality from './components/Highlights/AirQuality';

function App() {
  const [city, setCity] = useState('Gatineau');
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [timezone, setTimezone] = useState('UTC');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeatherData(city);
        setCurrent(data.current);
        setForecast(data.daily);
        setTimezone(data.timezone);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    fetchData();
  }, [city]);

  const getLocalTime = (timestamp, timeZone) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timeZone,
    }).format(new Date(timestamp * 1000));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl shadow-xl bg-gradient-to-br from-gray-100 to-blue-300 p-6">
        {/* Left column */}
        <aside className="space-y-6 bg-white p-6 rounded shadow">
          <SearchBar onSearch={setCity} />
          {current && (
            <>
              <WeatherIcon iconCode={current.weather[0].icon} />
              <TemperatureCard
                temp={Math.round(current.temp)}
                description={current.weather[0].description}
                time={getLocalTime(current.dt, timezone)}
              />
              <LocationInfo city={city} />
            </>
          )}
        </aside>

        {/* Right column */}
        <section className="md:col-span-2 space-y-6">
          <ForecastTabs onTabChange={() => {}} />
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {forecast.map((day, idx) => (
              <ForecastDayCard
                key={idx}
                day={new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                icon={day.weather[0].icon}
                tempMin={Math.round(day.temp.min)}
                tempMax={Math.round(day.temp.max)}
              />
            ))}
          </div>

          {current && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UVIndex value={5} label="Moderate" />
              <WindStatus value={`${current.wind_speed} km/h`} label="WSW" />
              <SunriseSunset
                value={`${getLocalTime(current.sunrise, timezone)} / ${getLocalTime(current.sunset, timezone)}`}
                label="↑ ↓"
              />
              <Humidity value={`${current.humidity}%`} label="Normal 👍" />
              <Visibility value={`10.0 km`} label="Average 😐" />
              <AirQuality value="105" label="Unhealthy 👎" /> {/* Placeholder */}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
