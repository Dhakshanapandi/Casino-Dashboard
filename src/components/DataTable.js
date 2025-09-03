import { useRef, useState } from "react";
import ExportButton from "./Export_Button";

function DataTable({ data }) {
  const chartRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  if (!data || data.length === 0) {
    return <p className="text-gray-500">No data available. Upload a file first.</p>;
  }

  const headers = Object.keys(data[0]);

  // Filtering
  const filteredData = data.filter((row) =>
    headers.some((header) =>
      String(row[header]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sorting
  const sortedData = [...filteredData];
  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortConfig.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }

  const handleSort = (header) => {
    if (sortConfig.key === header) {
      setSortConfig({
        key: header,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key: header, direction: "asc" });
    }
  };

  return (
    <div ref={chartRef} className="w-full h-[400px]">
      {/* Search */}
      <div className="mb-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-2 py-1 w-full md:w-1/3"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header)}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"
                >
                  {header}{" "}
                  {sortConfig.key === header
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.map((row, i) => (
              <tr
                key={i}
                className={`hover:bg-gray-50 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-4 py-2 text-sm text-gray-600"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="mt-4 mb-3">
        <ExportButton chartRef={chartRef} imgname="DataTable.png" />
      </div>
    </div>
  );
}

export default DataTable;
