export default function ExportButton({ expenses }) {
  const handleExport = () => {
    if (!expenses || expenses.length === 0) {
      alert("No expenses to export for current filters.");
      return;
    }

    const headers = ["Date", "Category", "Note", "Amount"];

    const rows = expenses.map((exp) => [
      exp.date?.slice(0, 10) || "",
      exp.category || "",
      exp.note || "",
      exp.amount != null ? String(exp.amount) : "",
    ]);

    // helper to escape CSV values
    const toCsvValue = (val) => {
      const v = String(val ?? "");
      const escaped = v.replace(/"/g, '""'); // escape quotes
      return `"${escaped}"`;
    };

    const csvLines = [
      headers.map(toCsvValue).join(","),
      ...rows.map((row) => row.map(toCsvValue).join(",")),
    ];

    const csvContent = csvLines.join("\r\n");

    // create downloadable file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    const timestamp = new Date().toISOString().slice(0, 10);
    link.download = `expenses-${timestamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button className="btn btn-secondary" type="button" onClick={handleExport}>
      Export CSV
    </button>
  );
}
