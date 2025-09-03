import html2canvas from "html2canvas";

const ExportButton = ({ chartRef, imgname }) => {

  const downloadChart = () => {
    if (!chartRef.current) return;

    html2canvas(chartRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = imgname;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={downloadChart}
        className="export-btn px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download Chart
      </button>
    </div>
  );
};

export default ExportButton;
