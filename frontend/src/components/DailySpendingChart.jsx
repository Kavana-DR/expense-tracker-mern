import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function DailySpendingChart({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return null;
  }

  // group by date (YYYY-MM-DD)
  const byDate = expenses.reduce((acc, exp) => {
    const d = exp.date?.slice(0, 10);
    if (!d) return acc;
    acc[d] = (acc[d] || 0) + exp.amount;
    return acc;
  }, {});

  // convert to sorted array
  const data = Object.entries(byDate)
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
      <h3>Daily Spending</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
