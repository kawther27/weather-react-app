import React from 'react';
import { FiNavigation } from 'react-icons/fi';

const WindStatus = ({ value, label }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow text-left flex flex-col justify-between h-full">
      <h3 className="text-sm text-gray-500 mb-2">Wind Status</h3>
      <div className="flex items-baseline space-x-1 mb-4">
        <span className="text-4xl font-semibold">{parseFloat(value)}</span>
        <span className="text-md text-gray-500">km/h</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-700">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <FiNavigation className="text-indigo-500 rotate-[45deg]" />
        </div>
        <span className="font-medium text-black">{label}</span>
      </div>
    </div>
  );
};

export default WindStatus;