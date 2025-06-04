import React, { useState } from 'react';

function ForecastTabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState('Today');

  const handleTab = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex justify-start space-x-6 text-lg font-medium">
      {['Today', 'Week'].map((tab) => (
        <button
          key={tab}
          onClick={() => handleTab(tab)}
          className={`relative pb-1 transition-colors duration-200 ${
            activeTab === tab
              ? 'text-black after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-black after:rounded'
              : 'text-gray-400'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default ForecastTabs;
