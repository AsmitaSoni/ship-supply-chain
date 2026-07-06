import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";
import { toast } from "react-toastify";
import * as bootstrap from "bootstrap";

import {
  getPaths,
  createPath,
  updatePath,
  deletePath,
} from "../../services/pathService";

import PathForm from "../../components/paths/PathForm";

function PathList() {
  const [paths, setPaths] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadPaths();
  }, []);

  const loadPaths = async () => {
    try {
      const res = await getPaths();
      setPaths(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editData) {
        await updatePath(editData._id, data);
        toast.success("Path updated successfully");
      } else {
        await createPath(data);
        toast.success("Path added successfully");
      }

      await loadPaths();

      bootstrap.Modal.getOrCreateInstance(
        document.getElementById("pathModal")
      ).hide();

      setEditData(null);

      document.body.classList.remove("modal-open");
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((el) => el.remove());

    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deletePath(deleteId);

      toast.success("Path deleted successfully");

      await loadPaths();

      bootstrap.Modal.getOrCreateInstance(
        document.getElementById("confirmDeleteModal")
      ).hide();

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
        title="Path Management"
        buttonText="+ Add Path"
        modalId="pathModal"
        onClick={() => setEditData(null)}
      />

      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Distance (km)</th>
            <th>Estimated Time</th>
            <th>Status</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>

          {paths.map((path) => (

            <tr key={path._id}>

              <td>{path.fromLocation?.locationName}</td>

              <td>{path.toLocation?.locationName}</td>

              <td>{path.distance}</td>

              <td>{path.estimatedTime} min</td>

              <td>
                <StatusBadge status={path.status} />
              </td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#pathModal"
                  onClick={() => setEditData(path)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteModal"
                  onClick={() => setDeleteId(path._id)}
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
        id="pathModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title">
                {editData ? "Edit Path" : "Add Path"}
              </h5>

              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>

            </div>

            <div className="modal-body">

              <PathForm
                onSave={handleSave}
                editData={editData}
              />

            </div>

          </div>

        </div>

      </div>

      <ConfirmDeleteModal
        title="Delete Path"
        message="Are you sure you want to delete this path?"
        onConfirm={handleDelete}
      />

    </DashboardLayout>
  );
}

export default PathList;