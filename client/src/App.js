import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VesselList from "./pages/vessels/VesselList";
import PortList from "./pages/ports/PortList";

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
  path="/ports"
  element={
    <ProtectedRoute>
      <PortList />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );

  
}

export default App;