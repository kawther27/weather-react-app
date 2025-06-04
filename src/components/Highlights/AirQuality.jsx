import React from "react";

const AirQuality = ({ value, label }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow text-left flex flex-col justify-between">
      <h3 className="text-sm text-gray-500 mb-2">Air Quality</h3>
      <div className="flex items-center justify-between">
        <p className="text-4xl font-semibold">{value}</p>
        <div className="w-4 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full" />
        </div>
      </div>
      <p className="text-md text-gray-700 mt-3 font-medium">{label}</p>
    </div>
  );
};

export default AirQuality;
