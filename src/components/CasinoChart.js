import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

function CasinoChart({ data }) {
    console.log("casino called");
    
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Game" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Players" fill="#8884d8" />
          <Bar dataKey="Revenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CasinoChart;
