import React from 'react';

const WeatherIcon = ({ iconCode = '01d', size = 80 }) => {
 

  const iconPath = `/src/assets/weather-icons/${iconCode || '01'}.svg`;

  return (
    <img
      src={iconPath}
      alt="weather icon"
      width={size}
      height={size}
      className="mx-auto"
    />
  );
};

export default WeatherIcon;
