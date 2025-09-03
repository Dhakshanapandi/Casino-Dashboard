function DataTable({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No data available. Upload a file first.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto border rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 text-sm text-gray-600">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
