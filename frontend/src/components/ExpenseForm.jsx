import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return;

    try {
      const res = await axiosClient.post("/api/expenses", {
        amount: Number(amount),
        category,
        date,
        note,
      });

      onAdd && onAdd(res.data);
      setAmount("");
      setNote("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <input
        className="input"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select
        className="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>

      <input
        className="input"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        className="input"
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button className="btn btn-primary" type="submit">
        Add
      </button>
    </form>
  );
}
