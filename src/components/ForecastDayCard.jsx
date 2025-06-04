// src/components/ForecastDayCard.jsx
import React from 'react';
import WeatherIcon from './WeatherIcon';

function ForecastDayCard({ day, icon, tempMin, tempMax }) {
  return (
    <div className="flex flex-col items-center gap-2 bg-white rounded-3xl px-4 py-6 shadow-md">
      <p className="text-base text-gray-500 font-medium">{day}</p>

      <div className="w-12 h-12 flex items-center justify-center">
        <WeatherIcon iconCode={icon} size={48} />
      </div>

      <div className="text-sm font-semibold text-gray-900 flex gap-1">
        <span>{tempMin}°</span>
        <span className="text-gray-400">/</span>
        <span>{tempMax}°</span>
      </div>
    </div>
  );
}

export default ForecastDayCard;
