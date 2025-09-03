import * as XLSX from "xlsx";

function ExcelUploader({ onData }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      onData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
 
  return (
    <div className="mb-6">
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFile}
        className="block w-full text-sm text-gray-600
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100"
      />
    </div>
  );
}

export default ExcelUploader;
