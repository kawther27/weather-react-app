import React from 'react';
import WeatherIcon from './WeatherIcon';

function ForecastDayCard({ day, icon, tempMin, tempMax }) {
  return (
    <div className="text-center bg-white shadow p-4 rounded-2xl space-y-2">
      <p className="text-sm text-gray-500">{day}</p>
      <WeatherIcon iconCode={icon} size={48} />
      <p className="text-md font-semibold">{tempMin}° / {tempMax}°</p>
    </div>
  );
}

export default ForecastDayCard;
