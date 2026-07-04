import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
//   const navigate = useNavigate();

  return (
    <nav className="navbar navbar-light bg-light shadow-sm px-4">

      <h5>Supply Chain Management</h5>

      <div>

        <span className="me-3">
          {user?.name} ({user?.role})
        </span>

        <button
          className="btn btn-danger btn-sm"
          onClick={logout}
        >
          Logout
        </button>
        


      </div>

    </nav>
  );
}

export default Navbar;