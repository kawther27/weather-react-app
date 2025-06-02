import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const TIMEZONE_API = 'http://api.timezonedb.com/v2.1/get-time-zone';
const TIMEZONE_API_KEY = import.meta.env.VITE_TIMEZONEDB_API_KEY;

export const getWeatherData = async (city) => {
  const geo = await axios.get(`${GEO_URL}?q=${city}&limit=1&appid=${API_KEY}`);
  const { lat, lon } = geo.data[0];

  const oneCall = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`);

  return {
    current: oneCall.data.current,
    daily: oneCall.data.daily.slice(0, 7),
    timezone: oneCall.data.timezone,
  };
};

