import React, { useEffect, useState } from 'react';
import { getWeatherData } from './api/weather';

import UnitToggle from './components/UnitToggle';
import SearchBar from './components/SearchBar';
import TemperatureCard from './components/TemperatureCard';
import WeatherIcon from './components/WeatherIcon';
import LocationInfo from './components/LocationInfo';
import ForecastTabs from './components/ForecastTabs';
import ForecastDayCard from './components/ForecastDayCard';
import MapView from './components/MapView';

import UVIndex from './components/Highlights/UVIndex';
import WindStatus from './components/Highlights/WindStatus';
import SunriseSunset from './components/Highlights/SunriseSunset';
import Humidity from './components/Highlights/Humidity';
import Visibility from './components/Highlights/Visibility';
import AirQuality from './components/Highlights/AirQuality';
import DetailedDayView from './components/DetailedDayView';

function App() {
  const [city, setCity] = useState('Gatineau');
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [timezone, setTimezone] = useState('UTC');
  const [mapCoords, setMapCoords] = useState({ lat: 45.4215, lon: -75.6972 });
  const [unit, setUnit] = useState('metric');
  const [aqi, setAqi] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Week");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeatherData(city, unit);
        setCurrent(data.current);
        console.log('Current Weather:', data.current);
        setForecast(data.daily);
        setHourly(data.hourly);
        console.log("Hourly data from API:", data.hourly);
        setTimezone(data.timezone);
        setMapCoords({ lat: data.current.lat || 45.4215, lon: data.current.lon || -75.6972 });
        setAqi(data.aqi);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    fetchData();
  }, [city, unit]);

  const getLocalTime = (timestamp, timeZone) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timeZone,
    }).format(new Date(timestamp * 1000));
  };

  const todayData = current && {
    day: "Today",
    current: {
      temperature: Math.round(current.temp),
      description: current.weather[0].description,
      time: getLocalTime(current.dt, timezone),
      location: city,
    },
    uv: current.uvi,
    wind: {
      speed: current.wind_speed,
      direction: "WSW",
    },
    sun: {
      sunrise: getLocalTime(current.sunrise, timezone),
      sunrise_change: "-1m 46s",
      sunset: getLocalTime(current.sunset, timezone),
      sunset_change: "+2m 22s",
    },
    humidity: {
      value: current.humidity,
      status:
        current.humidity < 30
          ? "Low 😓"
          : current.humidity < 60
          ? "Normal 👍"
          : "High 💦",
    },
    visibility: {
      value: (current.visibility / 1000).toFixed(1),
      status:
        current.visibility >= 10000
          ? "Excellent 😎"
          : current.visibility >= 5000
          ? "Average 🙂"
          : "Low 😬",
    },
    air_quality: {
      value: aqi,
      status:
        aqi === 1
          ? "Good 👍"
          : aqi === 2
          ? "Fair 🙂"
          : aqi === 3
          ? "Moderate 😐"
          : aqi === 4
          ? "Poor 😷"
          : "Very Poor 👎",
    },
    map: mapCoords,
    hourly: hourly,
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 rounded-3xl shadow-xl bg-gradient-to-br from-gray-100 to-blue-300 p-4 md:p-6">
        <aside className="bg-white p-4 sm:p-6 flex flex-col justify-between rounded-2xl min-h-[85vh] shadow-md">
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
              <MapView lat={mapCoords.lat} lon={mapCoords.lon} city={city} />
            </>
          )}
        </aside>

        <section className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-6 text-lg font-medium">
              <button
                onClick={() => setSelectedTab("Today")}
                className={`pb-1 border-b-2 transition-all duration-200 ${
                  selectedTab === "Today"
                    ? "border-black text-black"
                    : "border-transparent text-gray-400"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setSelectedTab("Week")}
                className={`pb-1 border-b-2 transition-all duration-200 ${
                  selectedTab === "Week"
                    ? "border-black text-black"
                    : "border-transparent text-gray-400"
                }`}
              >
                Week
              </button>
            </div>
            <UnitToggle unit={unit} setUnit={setUnit} />
          </div>

          {selectedTab === "Today" ? (
            <DetailedDayView dayData={todayData} onBack={() => setSelectedTab("Week")} />
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <UVIndex value={current.uvi} label={todayData.uv < 3 ? 'Low' : todayData.uv < 6 ? 'Moderate' : 'High'} />
                  <WindStatus value={`${current.wind_speed} km/h`} label="WSW" />
                  <SunriseSunset sunrise={current.sunrise} sunset={current.sunset} />
                  <Humidity value={`${current.humidity}%`} label={todayData.humidity.status} />
                  <Visibility value={`${todayData.visibility.value} km`} label={todayData.visibility.status} />
                  <AirQuality value={aqi} label={todayData.air_quality.status} />
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
