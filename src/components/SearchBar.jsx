import React from 'react';
import { FiSearch, FiCrosshair } from 'react-icons/fi'; 

const SearchBar = ({ onSearch }) => {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-2 rounded-full shadow-sm w-full">
      <div className="flex items-center space-x-2">
        <FiSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search for places ..."
          onKeyDown={(e) => e.key === 'Enter' && onSearch(e.target.value)}
          className="outline-none bg-transparent text-gray-800 placeholder-gray-400 w-full"
        />
      </div>
      <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
        <FiCrosshair className="text-gray-600" />
      </button>
    </div>
  );
};

export default SearchBar;
