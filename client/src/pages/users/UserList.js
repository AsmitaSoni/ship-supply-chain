import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";
import UserForm from "../../components/users/UserForm";
import { toast } from "react-toastify";
import * as bootstrap from "bootstrap";

import {
  getUsers,
  updateUser,
  deleteUser,
} from "../../services/userService";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  const handleSave = async (data) => {
    try {
      await updateUser(editData._id, data);

      toast.success("User updated successfully");

      await loadUsers();

      const modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("userModal")
      );

      modal.hide();

      document.body.classList.remove("modal-open");
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((el) => el.remove());

      setEditData(null);
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(deleteId);

      toast.success("User deleted successfully");

      await loadUsers();

      const modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("confirmDeleteModal")
      );

      modal.hide();

      document.body.classList.remove("modal-open");
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((el) => el.remove());

      setDeleteId(null);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Delete failed"
      );
    }
  };

  return (
    <DashboardLayout>

      <PageHeader
        title="User Management"
        buttonText={null}
      />

      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user._id}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#userModal"
                  onClick={() => setEditData(user)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteModal"
                  onClick={() => setDeleteId(user._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Edit Modal */}

      <div
        className="modal fade"
        id="userModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title">
                Edit User
              </h5>

              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>

            </div>

            <div className="modal-body">

              <UserForm
                editData={editData}
                onSave={handleSave}
              />

            </div>

          </div>

        </div>

      </div>

      <ConfirmDeleteModal
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onConfirm={handleDelete}
      />

    </DashboardLayout>
  );
}

export default UserList;