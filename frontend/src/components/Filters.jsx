  import { useState } from "react";
  
  export default function Filters({ onChange }) {
  const [category, setCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const applyFilters = () => {
    onChange({
      category,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

  const clearFilters = () => {
    setCategory("All");
    setStartDate("");
    setEndDate("");
    onChange({
      category: "All",
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <div className="filters-row">
      <select
        className="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>

      <input
        className="input"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        className="input"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button type="button" className="btn btn-secondary" onClick={applyFilters}>
        Apply
      </button>
      <button type="button" className="btn btn-secondary" onClick={clearFilters}>
        Clear
      </button>
    </div>
  );
}
