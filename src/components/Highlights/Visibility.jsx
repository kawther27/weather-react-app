
import React from 'react';

function Visibility  ({ value, label }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow text-center">
      <h4 className="font-semibold text-sm">Visibility</h4>
      <p className="text-lg mt-2">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default Visibility;
