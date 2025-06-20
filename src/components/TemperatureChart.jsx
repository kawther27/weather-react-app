import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TemperatureChart = ({ data }) => {
  return (
    <div className="bg-[#1f263e] p-4 rounded-xl shadow-md">
      <h3 className="text-white text-lg mb-4">Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1f263e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            stroke="#ccc"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#ccc"
            domain={[0, "dataMax + 5"]}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}°`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f263e", borderColor: "#333" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#ff7300"
            fillOpacity={1}
            fill="url(#tempGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
