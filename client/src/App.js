import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VesselList from "./pages/vessels/VesselList";
import PortList from "./pages/ports/PortList";
import NotFound from "./pages/NotFound";
import LocationList from "./pages/locations/LocationList";
import PathList from "./pages/paths/PathList";
import AdminRoute from "./routes/AdminRoute";
import UserList from "./pages/users/UserList";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/vessels"
    element={
        <ProtectedRoute>
            <VesselList />
        </ProtectedRoute>
    }
/>
<Route
  path="/locations"
  element={
    <ProtectedRoute>
      <LocationList />
    </ProtectedRoute>
  }
/>

<Route
  path="/paths"
  element={
    <ProtectedRoute>
      <PathList />
    </ProtectedRoute>
  }
/>
<Route
  path="/users"
  element={
    <AdminRoute>
      <UserList />
    </AdminRoute>
  }
/>
<Route
  path="/ports"
  element={
    <ProtectedRoute>
      <PortList />
    </ProtectedRoute>
  }
/>
<Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );

  
}

export default App;