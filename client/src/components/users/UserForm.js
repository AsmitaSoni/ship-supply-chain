import { useEffect, useState } from "react";

function UserForm({ editData, onSave }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Employee",
  });

  useEffect(() => {

    if (editData) {

      setForm({
        name: editData.name,
        email: editData.email,
        role: editData.role,
      });

    }

  }, [editData]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave(form);

  };

  return (

    <form onSubmit={handleSubmit}>

      <input
        className="form-control mb-2"
        placeholder="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <select
        className="form-control mb-3"
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option>Admin</option>
        <option>Manager</option>
        <option>Employee</option>
      </select>

      <button className="btn btn-success w-100">
        Update User
      </button>

    </form>

  );

}

export default UserForm;