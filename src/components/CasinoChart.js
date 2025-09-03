import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { useRef, useState } from "react";
import ExportButton from "./Export_Button";

function CasinoChart({ data }) {
  const chartRef = useRef(null);
  const [selectedMetric, setSelectedMetric] = useState("Players");

  // Map metric to Y axis and color
  const metrics = {
    Players: { yAxisId: "left", fill: "#8884d8" },
    Revenue: { yAxisId: "right", fill: "#82ca9d" },
    Bets: { yAxisId: "right", fill: "#ffc658" },
    Wins: { yAxisId: "left", fill: "#ff8042" },
  };

  return (
    <div>
      {/* Dropdown to select metric */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Metric:</label>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {Object.keys(metrics).map((metric) => (
            <option key={metric} value={metric}>
              {metric}
            </option>
          ))}
        </select>
      </div>

      <div ref={chartRef} className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Game" />

            {/* Left and Right Y axes */}
            <YAxis yAxisId="left" label={{ value: 'Players/Wins', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Revenue/Bets', angle: 90, position: 'insideRight' }} />

            <Tooltip />
            <Legend />

            {/* Render selected metric */}
            <Bar
              yAxisId={metrics[selectedMetric].yAxisId}
              dataKey={selectedMetric}
              fill={metrics[selectedMetric].fill}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ExportButton chartRef={chartRef} imgname="BarChart.png" />
    </div>
  );
}

export default CasinoChart;
