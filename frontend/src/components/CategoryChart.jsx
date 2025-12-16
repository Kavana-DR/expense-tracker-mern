import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CategoryChart({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return <p>No data for chart.</p>;
  }

  // prepare data: [{ name: 'Food', value: 300 }, ...]
  const byCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const data = Object.entries(byCategory).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
      <h3>Spending by Category</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            outerRadius={100}
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
