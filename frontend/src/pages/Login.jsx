import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/api/auth/login", {
        email,
        password,
      });
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="page">
      
      <div className="page-inner">
        <div className="card auth-card">
          <h1 className="auth-title">Welcome back 👋</h1>
          <p className="auth-subtitle">
            Log in to track and visualize your daily expenses.
          </p>

          <form className="form" onSubmit={handleLogin}>
            <input
              className="input"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>

          <p style={{ marginTop: 16, fontSize: "0.85rem" }}>
            Don&apos;t have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
