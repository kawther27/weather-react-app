
import React, { useState } from 'react';

function ForecastTabs  ({ onTabChange })  {
  const [activeTab, setActiveTab] = useState('Today');

  const handleTab = (tab) => {
        setActiveTab(tab);
        onTabChange(tab);
  };

  return (
    <div className="flex justify-center space-x-4">
      {['Today', 'Week'].map((tab) => (
        <button
          key={tab}
          onClick={() => handleTab(tab)}
          className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ForecastTabs;
