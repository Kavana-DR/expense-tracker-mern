import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Filters from "../components/Filters";
import CategoryChart from "../components/CategoryChart";
import DailySpendingChart from "../components/DailySpendingChart";
import { useNavigate } from "react-router-dom";
import ExportButton from "../components/ExportButton";


export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    category: "All",
    startDate: undefined,
    endDate: undefined,
  });

  const fetchExpenses = async (currentFilters = filters) => {
    try {
      const params = {};

      if (currentFilters.category && currentFilters.category !== "All") {
        params.category = currentFilters.category;
      }
      if (currentFilters.startDate) params.startDate = currentFilters.startDate;
      if (currentFilters.endDate) params.endDate = currentFilters.endDate;

      const res = await axiosClient.get("/api/expenses", { params });
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load expenses. Please login again.");
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchExpenses(newFilters);
  };

  return (
    <div className="page">
      <div className="page-inner">
        <div className="card">
          <div className="dashboard-header">
            <div>
              <div className="dashboard-title">
                <h1>Hi, {user?.name || "there"} 👋</h1>
              </div>
              <div className="dashboard-subtitle">
                <b>Track your spending, filter by time & category, and visualize it.</b>
              </div>
            </div>

            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="section">
            <div className="section-title">Add Expense</div>
            <ExpenseForm onAdd={handleAddExpense} />
          </div>

          <div className="section">
            <div className="section-title">Filters</div>
            <Filters onChange={handleFilterChange} />
          </div>
         

          <div className="section">
              <div className="section-header">
                 <div className="section-title"><h1>Your Expenses</h1></div>
                 <ExportButton expenses={expenses} />
              </div>
              <ExpenseList expenses={expenses} />
          </div>


          <div className="section chart-block">
            <CategoryChart expenses={expenses} />
          </div>

          <div className="section chart-block">
            <DailySpendingChart expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
}
