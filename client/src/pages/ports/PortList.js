import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";
import * as bootstrap from "bootstrap";

import {
  getPorts,
  createPort,
  updatePort,
  deletePort,
} from "../../services/portService";

import PortForm from "../../components/ports/PortForm";

function PortList() {
  const [ports, setPorts] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadPorts();
  }, []);

  const loadPorts = async () => {
    try {
      const res = await getPorts();
      setPorts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const handleSave = async (data) => {
  try {
    if (editData) {
      await updatePort(editData._id, data);
      toast.success("Port updated successfully");
      
    } else {
      await createPort(data);
      toast.success("Port created successfully");
    }

    await loadPorts();

    const modalElement = document.getElementById("portModal");

    const modal =
      bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.hide();
    document.body.classList.remove("modal-open");

document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

document.body.style.removeProperty("padding-right");

setEditData(null);

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      err.response?.data ||
      err.message
    );
  }
};

  const handleDelete = async () => {
  try {
    await deletePort(deleteId);

    toast.success("Port deleted successfully");

    loadPorts();

 const modalElement = document.getElementById("confirmDeleteModal");

const modal =
  bootstrap.Modal.getOrCreateInstance(modalElement);

modal.hide();
document.body.classList.remove("modal-open");

document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

document.body.style.removeProperty("padding-right");

  } catch (err) {
    toast.error("Delete failed");
  }
};

  return (
    <DashboardLayout>

      <PageHeader
  title="Port Management"
  buttonText="+ Add Port"
  modalId="portModal"
  onClick={() => setEditData(null)}
/>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>
            <th>Port Name</th>
            <th>Country</th>
            <th>Code</th>
            <th>Status</th>
            <th width="180">Actions</th>
          </tr>

        </thead>

        <tbody>

          {ports.map((port) => (

            <tr key={port._id}>

              <td>{port.portName}</td>

              <td>{port.country}</td>

              <td>{port.code}</td>

              <td>
                <StatusBadge status={port.status} />
              </td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#portModal"
                  onClick={() => setEditData(port)}
                >
                  Edit
                </button>

                <button
  className="btn btn-danger btn-sm"
  data-bs-toggle="modal"
  data-bs-target="#confirmDeleteModal"
  onClick={() => setDeleteId(port._id)}
>
  Delete
</button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Bootstrap Modal */}

      <div
        className="modal fade"
        id="portModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title">
                {editData ? "Edit Port" : "Add Port"}
              </h5>

              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>

            </div>

            <div className="modal-body">

              <PortForm
                onSave={handleSave}
                editData={editData}
              />

            </div>

          </div>

        </div>

      </div>

<ConfirmDeleteModal
  title="Delete Port"
  message="Are you sure you want to delete this port?"
  onConfirm={handleDelete}
/>
    </DashboardLayout>
  );
}


export default PortList;