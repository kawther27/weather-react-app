import React from 'react';

const UVIndex = ({ value = 0, label = 'Unknown' }) => {
  const percentage = Math.min((value / 12) * 100, 100);

  return (
    <div className="bg-white rounded-2xl p-4 shadow text-center">
      <h3 className="text-sm font-medium text-gray-500 mb-4">UV Index</h3>
      
      <div className="relative w-24 h-24 mx-auto">
        <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="text-yellow-400"
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-800">{value}</span>
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default UVIndex;
