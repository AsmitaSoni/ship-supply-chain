import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getVessels } from "../../services/vesselService";
import VesselForm from "../../components/vessels/VesselForm";
import { createVessel } from "../../services/vesselService";
import { deleteVessel } from "../../services/vesselService";
import { updateVessel } from "../../services/vesselService";
import { Modal } from "bootstrap";
import { toast } from "react-toastify";
import PageHeader from "../../components/common/PageHeader";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";

function VesselList() {

    const [vessels, setVessels] = useState([]);

    useEffect(() => {
        loadVessels();
    }, []);

    const loadVessels = async () => {
        const res = await getVessels();
        setVessels(res.data);
    };

const handleSave = async (data) => {
  try {
    if (editData) {
      await updateVessel(editData._id, data);
      toast.success("Vessel updated successfully");
    } else {
      await createVessel(data);
      toast.success("Vessel added successfully");
    }

    // Refresh table
    await loadVessels();

    // Close modal
    const modalElement = document.getElementById("vesselModal");

    const modal = Modal.getOrCreateInstance(modalElement);

    modal.hide();

    // Reset edit mode
    setEditData(null);

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      err.response?.data ||
      err.message ||
      "Something went wrong"
    );
  }
};

const [deleteId, setDeleteId] = useState(null);
const handleDelete = async () => {
  try {
    await deleteVessel(deleteId);

    toast.success("Vessel deleted successfully");

    await loadVessels();
    setDeleteId(null);

    const modal =
      Modal.getOrCreateInstance(
        document.getElementById("confirmDeleteModal")
      );

    modal.hide();

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Delete failed"
    );
  }
};

const [editData, setEditData] = useState(null);

    return (

        <DashboardLayout>

            <PageHeader
  title="Vessel Management"
  buttonText="+ Add Vessel"
  modalId="vesselModal"
  onClick={() => setEditData(null)}
/>

            <table className="table table-bordered">

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>IMO</th>
                        <th>Type</th>
                        <th>Owner</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>
                    

                    {vessels.map((vessel) => (

                        <tr key={vessel._id}>

                            <td>{vessel.vesselName}</td>
                            <td>{vessel.imoNumber}</td>
                            <td>{vessel.vesselType}</td>
                            <td>{vessel.owner}</td>
                            <td>

<span
className={
vessel.status === "Active"
?
"badge bg-success"
:
"badge bg-danger"
}
>

{vessel.status}

</span>

</td>

                    <td>
    <button
  className="btn btn-warning btn-sm me-2"
  data-bs-toggle="modal"
  data-bs-target="#vesselModal"
  onClick={() => setEditData(vessel)}
>
  Edit
</button>

   <button
  className="btn btn-danger btn-sm"
  data-bs-toggle="modal"
  data-bs-target="#confirmDeleteModal"
  onClick={() => setDeleteId(vessel._id)}
>
  Delete
</button>

</td>
                        </tr>

                        

                    ))}

                </tbody>

            </table>
            <div
  className="modal fade"
  id="vesselModal"
  tabIndex="-1"
>
  <div className="modal-dialog modal-lg">
    <div className="modal-content">

      <div className="modal-header">

        <h5 className="modal-title">
          {editData ? "Edit Vessel" : "Add Vessel"}
        </h5>

        <button
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>

      </div>

      <div className="modal-body">

        <VesselForm
          onSave={handleSave}
          editData={editData}
        />

      </div>

    </div>
  </div>
</div>

<ConfirmDeleteModal
  title="Delete Vessel"
  message="Are you sure you want to delete this vessel?"
  onConfirm={handleDelete}
/>

        </DashboardLayout>

    );

}

export default VesselList;