import React from 'react';

function LocationInfo  ({ city })  {
  return (
    <div className="text-center">
      <p className="text-lg font-semibold">{city}</p>
    </div>
  );
};

export default LocationInfo;