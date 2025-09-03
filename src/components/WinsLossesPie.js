import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#0088FE", "#FF8042"];

function WinsLossesPie({ data }) {
  // Aggregate total wins & losses
  const totalWins = data.reduce((sum, row) => sum + (row.Wins || 0), 0);
  const totalLosses = data.reduce((sum, row) => sum + (row.Losses || 0), 0);

  const pieData = [
    { name: "Wins", value: totalWins },
    { name: "Losses", value: totalLosses },
  ];

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WinsLossesPie;
