import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const SunriseSunset = ({ sunrise, sunset }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Simulate differences (in real use you could pass previous day's data)
  const sunriseDiff = "- 1m 46s";
  const sunsetDiff = "+ 2m 22s";

  return (
    <div className="bg-white rounded-2xl p-6 shadow flex flex-col gap-4">
      <h3 className="text-sm text-gray-500">Sunrise & Sunset</h3>

      {/* Sunrise */}
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 p-2 rounded-full shadow">
          <FaArrowUp className="text-white" />
        </div>
        <div>
          <p className="text-md font-semibold">{formatTime(sunrise)}</p>
          <p className="text-sm text-gray-500">{sunriseDiff}</p>
        </div>
      </div>

      {/* Sunset */}
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 p-2 rounded-full shadow">
          <FaArrowDown className="text-white" />
        </div>
        <div>
          <p className="text-md font-semibold">{formatTime(sunset)}</p>
          <p className="text-sm text-gray-500">{sunsetDiff}</p>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;
