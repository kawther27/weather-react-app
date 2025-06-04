// src/components/UnitToggle.jsx
import React from 'react';

const UnitToggle = ({ unit, setUnit }) => {
  return (
    <div className="flex justify-end gap-2 mb-4">
      <button
        onClick={() => setUnit('metric')}
        className={`px-3 py-1 rounded-full ${unit === 'metric' ? 'bg-black text-white' : 'bg-gray-200'}`}
      >
        °C
      </button>
      <button
        onClick={() => setUnit('imperial')}
        className={`px-3 py-1 rounded-full ${unit === 'imperial' ? 'bg-black text-white' : 'bg-gray-200'}`}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
