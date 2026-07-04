import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getVessels } from "../../services/vesselService";
import VesselForm from "../../components/vessels/VesselForm";
import { createVessel } from "../../services/vesselService";
import { deleteVessel } from "../../services/vesselService";
import { updateVessel } from "../../services/vesselService";
import { Modal } from "bootstrap";

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

      alert("Vessel Updated");

      setEditData(null);

    } else {

      await createVessel(data);

      alert("Vessel Added");

    }

    loadVessels();

  } catch (err) {

    alert(err.response?.data?.message || "Something went wrong");

  }
  const modalElement = document.getElementById("vesselModal");

const modalInstance = Modal.getInstance(modalElement);

if (modalInstance) {
    modalInstance.hide();
}
};
const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Delete this vessel?"
    );

    if (!confirmDelete) return;

    try {

        await deleteVessel(id);

        loadVessels();

    } catch (err) {

        alert("Delete Failed");

    }

};

const [editData, setEditData] = useState(null);

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between mb-3">

                <h2>Vessels</h2>

                <button
  className="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#vesselModal"
  onClick={() => setEditData(null)}
>
  + Add Vessel
</button>
                {/* <VesselForm onSave={handleSave} editData={editData}/> */}

            </div>

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
    onClick={() => handleDelete(vessel._id)}
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

        </DashboardLayout>

    );

}

export default VesselList;