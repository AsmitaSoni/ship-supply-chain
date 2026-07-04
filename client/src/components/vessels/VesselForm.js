import { useEffect, useState } from "react";

function VesselForm({ onSave, editData }) {
  const [form, setForm] = useState({
    vesselName: "",
    imoNumber: "",
    vesselType: "",
    owner: "",
    flag: "",
    status: "Active",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
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
        vesselName: "",
        imoNumber: "",
        vesselType: "",
        owner: "",
        flag: "",
        status: "Active",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        className="form-control mb-2"
        name="vesselName"
        value={form.vesselName}
        onChange={handleChange}
        placeholder="Vessel Name"
        required
      />

      <input
        className="form-control mb-2"
        name="imoNumber"
        value={form.imoNumber}
        onChange={handleChange}
        placeholder="IMO Number"
        required
      />

      <input
        className="form-control mb-2"
        name="vesselType"
        value={form.vesselType}
        onChange={handleChange}
        placeholder="Vessel Type"
      />

      <input
        className="form-control mb-2"
        name="owner"
        value={form.owner}
        onChange={handleChange}
        placeholder="Owner"
      />

      <input
        className="form-control mb-2"
        name="flag"
        value={form.flag}
        onChange={handleChange}
        placeholder="Flag"
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
        {editData ? "Update Vessel" : "Save Vessel"}
      </button>

    </form>
  );
}

export default VesselForm;