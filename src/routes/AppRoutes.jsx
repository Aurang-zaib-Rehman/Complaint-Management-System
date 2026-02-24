import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ProtectedRoute from "../components/ProtectedRoute";

// These pages are empty for now — fill them later
import CitizenDashboard from "../features/citizen/CitizenDashboard";
import AdminDashboard from "../features/admin/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Citizen only */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="citizen">
            <CitizenDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;