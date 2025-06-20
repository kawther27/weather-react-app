// src/api/weather.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const TIMEZONE_API = 'http://api.timezonedb.com/v2.1/get-time-zone';
const TIMEZONE_API_KEY = import.meta.env.VITE_TIMEZONEDB_API_KEY;

/**
 * Fetches current weather and 7-day forecast data for a given city.
 * @param {string} city - City name.
 * @param {string} unit - Unit system: 'metric' for Celsius, 'imperial' for Fahrenheit.
 */
export const getWeatherData = async (city, unit = 'metric') => {
  const geo = await axios.get(`${GEO_URL}?q=${city}&limit=1&appid=${API_KEY}`);
  const { lat, lon } = geo.data[0];

  const oneCall = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
    params: {
      lat,
      lon,
      exclude: 'minutely,alerts', // ✅ Keep hourly included
      units: unit,
      appid: API_KEY
    }
  });

  const airPollution = await axios.get(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const aqi = airPollution.data.list[0].main.aqi;

  const tzRes = await axios.get(`${TIMEZONE_API}`, {
    params: {
      key: TIMEZONE_API_KEY,
      format: 'json',
      by: 'position',
      lat,
      lng: lon,
    }
  });

  return {
    current: oneCall.data.current,
    daily: oneCall.data.daily.slice(0, 7),
    hourly: oneCall.data.hourly, // ✅ Add this
    timezone: oneCall.data.timezone || tzRes.data.zoneName,
    aqi
  };
};
