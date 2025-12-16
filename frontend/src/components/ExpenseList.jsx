export default function ExpenseList({ expenses }) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const byCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <div>
      <div className="summary-bar">
        <span className="summary-pill">Total: {total}</span>
        {Object.entries(byCategory).map(([cat, amt]) => (
          <span key={cat} className="summary-pill">
            {cat}: {amt}
          </span>
        ))}
      </div>

      {expenses.length === 0 ? (
        <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
          No expenses found for selected filters.
        </p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Note</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp._id}>
                  <td>{exp.date?.slice(0, 10)}</td>
                  <td>{exp.category}</td>
                  <td>{exp.note}</td>
                  <td>{exp.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
