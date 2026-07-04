import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { loadUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Successful");
      await loadUser();
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-5 mx-auto">

        <h2 className="text-center mb-4">
          Supply Chain Login
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;