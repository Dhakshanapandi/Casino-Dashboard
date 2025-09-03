import { useRef, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import ExportButton from "./Export_Button";

function RevenueLineChart({ data }) {
  const chartRef = useRef(null);
  const [yAxisKey, setYAxisKey] = useState("Revenue"); // default Y-axis

  const yOptions = ["Players", "Revenue", "Bets", "Wins"];

  return (
    <div ref={chartRef} className="w-full h-[400px]">
      {/* Dropdown */}
      <div className="mb-2">
        <label htmlFor="yAxisSelect" className="mr-2 font-medium">Select Y-axis:</label>
        <select
          id="yAxisSelect"
          value={yAxisKey}
          onChange={(e) => setYAxisKey(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {yOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Game" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={yAxisKey} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <ExportButton chartRef={chartRef} imgname="LineChart.png" />
    </div>
  );
}

export default RevenueLineChart;
