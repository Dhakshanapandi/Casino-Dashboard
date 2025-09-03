import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ExportAllCharts = ({ chartRefs, chartTitles }) => {

  const handleExportAll = async () => {
    const pdf = new jsPDF("p", "mm", "a4"); // A4 size

    // Optional: Hide export buttons during capture if inside chart container
    const exportBtns = document.querySelectorAll(".export-btn");
    exportBtns.forEach(btn => btn.style.visibility = "hidden");

    for (let i = 0; i < chartRefs.length; i++) {
      const ref = chartRefs[i];
      if (!ref.current) continue;

      // Capture chart as canvas
      const canvas = await html2canvas(ref.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Calculate image dimensions to fit PDF page
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // 10mm margin
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i !== 0) pdf.addPage(); // add new page for subsequent charts
      pdf.text(chartTitles[i], 10, 10); // optional title
      pdf.addImage(imgData, "PNG", 10, 20, pdfWidth, pdfHeight);
    }

    // Show export buttons again
    exportBtns.forEach(btn => btn.style.visibility = "visible");

    pdf.save("Charts.pdf");
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleExportAll}
        className="export-btn px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Export All Charts as PDF
      </button>
    </div>
  );
};

export default ExportAllCharts;
