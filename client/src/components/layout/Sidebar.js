import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {

  const { user } = useAuth();

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4 className="mb-4">🚢 SCM System</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/vessels">
            Vessels
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/ports">
            Ports
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/locations">
            Locations
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/paths">
            Paths
          </Link>
        </li>

        {user?.role === "Admin" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/users">
              Users
            </Link>
          </li>
        )}

      </ul>
    </div>
  );
}

export default Sidebar;