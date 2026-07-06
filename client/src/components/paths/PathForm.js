import { useEffect, useState } from "react";
import { getLocations } from "../../services/locationService";

function PathForm({ onSave, editData }) {
  const [locations, setLocations] = useState([]);

  const [form, setForm] = useState({
    fromLocation: "",
    toLocation: "",
    distance: "",
    estimatedTime: "",
    status: "Active",
  });

  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    if (editData) {
      setForm({
        fromLocation: editData.fromLocation?._id || "",
        toLocation: editData.toLocation?._id || "",
        distance: editData.distance,
        estimatedTime: editData.estimatedTime,
        status: editData.status,
      });
    } else {
      setForm({
        fromLocation: "",
        toLocation: "",
        distance: "",
        estimatedTime: "",
        status: "Active",
      });
    }
  }, [editData]);

  const loadLocations = async () => {
    const res = await getLocations();
    setLocations(res.data);
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

      <select
        className="form-control mb-2"
        name="fromLocation"
        value={form.fromLocation}
        onChange={handleChange}
        required
      >
        <option value="">From Location</option>

        {locations.map((location) => (
          <option key={location._id} value={location._id}>
            {location.locationName}
          </option>
        ))}
      </select>

      <select
        className="form-control mb-2"
        name="toLocation"
        value={form.toLocation}
        onChange={handleChange}
        required
      >
        <option value="">To Location</option>

        {locations.map((location) => (
          <option key={location._id} value={location._id}>
            {location.locationName}
          </option>
        ))}
      </select>

      <input
        className="form-control mb-2"
        placeholder="Distance (km)"
        name="distance"
        type="number"
        value={form.distance}
        onChange={handleChange}
        required
      />

      <input
        className="form-control mb-2"
        placeholder="Estimated Time (minutes)"
        name="estimatedTime"
        type="number"
        value={form.estimatedTime}
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
        {editData ? "Update Path" : "Save Path"}
      </button>

    </form>
  );
}

export default PathForm;