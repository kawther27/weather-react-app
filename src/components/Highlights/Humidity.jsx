import React from 'react';

const Humidity = ({ value, label }) => {
  return (
    <div className="flex justify-between items-center bg-white rounded-2xl p-6 shadow">
      
      {/* Left side: Text info */}
      <div className="text-left">
        <h3 className="text-sm text-gray-500 mb-2">Humidity</h3>
        <p className="text-3xl font-semibold mb-1">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>

      {/* Right side: Bar */}
      <div className="w-4 h-10 bg-gray-200 rounded-full flex items-center justify-center">
        <div
          className="w-3 h-3 bg-blue-600 rounded-full"
          style={{ height: `${parseInt(value)}%` }}
        />
      </div>
    </div>
  );
};

export default Humidity;

