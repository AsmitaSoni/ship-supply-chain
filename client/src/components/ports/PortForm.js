import { useEffect, useState } from "react";

function PortForm({ onSave, editData }) {
  const [form, setForm] = useState({
    portName: "",
    country: "",
    code: "",
    status: "Active",
  });

 useEffect(() => {
  if (editData) {
    setForm({
      portName: editData.portName,
      country: editData.country,
      code: editData.code,
      status: editData.status,
    });
  } else {
    setForm({
      portName: "",
      country: "",
      code: "",
      status: "Active",
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

    if (!editData) {
      setForm({
        portName: "",
        country: "",
        code: "",
        status: "Active",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        placeholder="Port Name"
        name="portName"
        value={form.portName}
        onChange={handleChange}
        required
      />

      <input
        className="form-control mb-2"
        placeholder="Country"
        name="country"
        value={form.country}
        onChange={handleChange}
        required
      />

      <input
        className="form-control mb-2"
        placeholder="Port Code"
        name="code"
        value={form.code}
        onChange={handleChange}
        required
      />

      <select
        className="form-control mb-3"
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <button className="btn btn-success w-100">
        {editData ? "Update Port" : "Save Port"}
      </button>
    </form>
  );
}

export default PortForm;