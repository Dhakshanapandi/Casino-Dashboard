import { useState,useRef} from "react";
import CasinoChart from "../components/CasinoChart";
import DataTable from "../components/DataTable.js";
import ExcelUploader from "../components/ExcelUploader";
import RevenueLineChart from "../components/RevenueLineChart";
import WinsLossesPie from "../components/WinsLossesPie";
import ExportAllCharts from "../components/ExportAllCharts.js";

function Dashboard() {
  const [data, setData] = useState([]);

  const barRef = useRef(null);
  const lineRef = useRef(null);
  const pieRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex justify-center items-center gap-2">
           Casino Data Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Visualize casino insights with interactive charts</p>
      
     
      </header>

      {/* Excel/CSV File Upload */}
      <div className="flex justify-center mb-5">
        <ExcelUploader onData={setData} />
      </div>
      <div className="mb-3">
       {
         data.length > 0 &&(
           <ExportAllCharts
           chartRefs={[ barRef,lineRef,pieRef]}
           chartTitles={["BarChart", "RevenueLineChart", "WinsLossesPie"]}
           />
          )
          
        }
        </div>

      {/* Charts Section */}
      {data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">📊 Players vs Revenue (Bar Chart)</h3>
            <div ref = {barRef}><CasinoChart data={data} /> </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow" ref = {lineRef}>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">📈 Revenue Trend (Line Chart)</h3>
            <RevenueLineChart data={data} />
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow" ref={pieRef}>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">🥇 Wins vs Losses (Pie Chart)</h3>
            <WinsLossesPie data={data} />
          </div>
        </div>
      )}

      {/* Raw Data Table */}
      {data.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-grey-700 flex items-center gap-2">
            📋 Raw Data
          </h2>
          <DataTable data={data} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
