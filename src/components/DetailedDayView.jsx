import React from "react";
import TemperatureChart from "./TemperatureChart";

const DetailedDayView = ({ dayData}) => {
  if (!dayData) return null;

  // Prepare hourlyData for chart
  const hourlyData = dayData.hourly?.slice(0, 24).map((hour) => ({
    time: new Date(hour.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(hour.temp),
  })) || [];

  return (
    <div className="p-4 md:p-8 text-white">

      <h2 className="text-2xl font-semibold mb-4">Weather Details for {dayData.day}</h2>

      {/* Overview Chart */}
      <TemperatureChart data={hourlyData} />

    
    </div>
  );
};

export default DetailedDayView;
