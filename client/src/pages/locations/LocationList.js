import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";
import { toast } from "react-toastify";
import * as bootstrap from "bootstrap";

import {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../../services/locationService";

import LocationForm from "../../components/locations/LocationForm";

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const res = await getLocations();
      setLocations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editData) {
        await updateLocation(editData._id, data);
        toast.success("Location updated successfully");
      } else {
        await createLocation(data);
        toast.success("Location added successfully");
      }

      await loadLocations();

      bootstrap.Modal
        .getOrCreateInstance(document.getElementById("locationModal"))
        .hide();

      setEditData(null);

      document.body.classList.remove("modal-open");
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((el) => el.remove());

    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLocation(deleteId);

      toast.success("Location deleted successfully");

      await loadLocations();

      bootstrap.Modal
        .getOrCreateInstance(
          document.getElementById("confirmDeleteModal")
        )
        .hide();

      setDeleteId(null);

      document.body.classList.remove("modal-open");
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((el) => el.remove());

    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <DashboardLayout>

      <PageHeader
        title="Location Management"
        buttonText="+ Add Location"
        modalId="locationModal"
        onClick={() => setEditData(null)}
      />

      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>Location</th>
            <th>Port</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Status</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>

          {locations.map((location) => (

            <tr key={location._id}>

              <td>{location.locationName}</td>

              <td>{location.port?.portName}</td>

              <td>{location.latitude}</td>

              <td>{location.longitude}</td>

              <td>
                <StatusBadge status={location.status} />
              </td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#locationModal"
                  onClick={() => setEditData(location)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteModal"
                  onClick={() => setDeleteId(location._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Add/Edit Modal */}

      <div
        className="modal fade"
        id="locationModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title">
                {editData ? "Edit Location" : "Add Location"}
              </h5>

              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>

            </div>

            <div className="modal-body">

              <LocationForm
                onSave={handleSave}
                editData={editData}
              />

            </div>

          </div>

        </div>
      </div>

      <ConfirmDeleteModal
        title="Delete Location"
        message="Are you sure you want to delete this location?"
        onConfirm={handleDelete}
      />

    </DashboardLayout>
  );
}

export default LocationList;