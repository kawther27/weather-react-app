import React from 'react';

function TemperatureCard  ({ temp, description, time })  {
  return (
    <div className="text-center space-y-2 ">
      <p className="text-5xl font-bold">{temp}°C</p>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm">{time}</p>
    </div>
  );
};

export default TemperatureCard;