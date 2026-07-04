import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>

      <h2>Dashboard</h2>

      <div className="row mt-4">

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Total Vessels</h5>
              <h2>12</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Ports</h5>
              <h2>8</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Users</h5>
              <h2>5</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Routes</h5>
              <h2>20</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-5">
        <h4>Welcome, {user?.name}</h4>
        <p>Role: {user?.role}</p>
      </div>

    </DashboardLayout>
  );
}

export default Dashboard;