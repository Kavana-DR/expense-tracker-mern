import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post("/api/auth/register", {
        name,
        email,
        password,
      });

      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="page">
      <div className="page-inner">
        <div className="card auth-card">
          <h1 className="auth-title">Create your account ✨</h1>
          <p className="auth-subtitle">
            Sign up once, track your expenses anytime.
          </p>

          <form className="form" onSubmit={handleRegister}>
            <input
              className="input"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              Register
            </button>
          </form>

          <p style={{ marginTop: 16, fontSize: "0.85rem" }}>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
