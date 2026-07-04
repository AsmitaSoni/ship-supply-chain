import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-5 mx-auto">

        <h2 className="text-center mb-4">
          Register
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />

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

          <select
            className="form-control mb-3"
            name="role"
            onChange={handleChange}
          >
            <option>Admin</option>
            <option>Manager</option>
            <option>Employee</option>
          </select>

          <button className="btn btn-success w-100">
            Register
          </button>

        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;