import React from 'react';

const Visibility = ({ value }) => {
  const numericValue = parseFloat(value);

  let label = 'Unknown';
  let emoji = '❓';

  if (numericValue >= 10) {
    label = 'Excellent';
    emoji = '😎';
  } else if (numericValue >= 5) {
    label = 'Average';
    emoji = '😐';
  } else if (numericValue > 0) {
    label = 'Poor';
    emoji = '😵';
  } else {
    label = 'Unavailable';
    emoji = '❌';
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow text-left">
      <h3 className="text-sm text-gray-500 mb-2">Visibility</h3>
      <p className="text-3xl font-semibold mb-1">{numericValue} <span className="text-base font-medium text-gray-600">km</span></p>
      <p className="text-sm text-gray-600">{label} {emoji}</p>
    </div>
  );
};

export default Visibility;
