import { useEffect, useState } from "react";
import { getPorts } from "../../services/portService";

function LocationForm({ onSave, editData }) {
  const [ports, setPorts] = useState([]);

  const [form, setForm] = useState({
    locationName: "",
    port: "",
    latitude: "",
    longitude: "",
    status: "Active",
  });

  useEffect(() => {
    loadPorts();
  }, []);

  useEffect(() => {
    if (editData) {
      setForm({
        locationName: editData.locationName,
        port: editData.port?._id || "",
        latitude: editData.latitude,
        longitude: editData.longitude,
        status: editData.status,
      });
    } else {
      setForm({
        locationName: "",
        port: "",
        latitude: "",
        longitude: "",
        status: "Active",
      });
    }
  }, [editData]);

  const loadPorts = async () => {
    const res = await getPorts();
    setPorts(res.data);
  };

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
        placeholder="Location Name"
        name="locationName"
        value={form.locationName}
        onChange={handleChange}
        required
      />

      <select
        className="form-control mb-2"
        name="port"
        value={form.port}
        onChange={handleChange}
        required
      >
        <option value="">Select Port</option>

        {ports.map((port) => (
          <option key={port._id} value={port._id}>
            {port.portName}
          </option>
        ))}
      </select>

      <input
        className="form-control mb-2"
        placeholder="Latitude"
        name="latitude"
        value={form.latitude}
        onChange={handleChange}
        required
      />

      <input
        className="form-control mb-2"
        placeholder="Longitude"
        name="longitude"
        value={form.longitude}
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
        {editData ? "Update Location" : "Save Location"}
      </button>

    </form>
  );
}

export default LocationForm;