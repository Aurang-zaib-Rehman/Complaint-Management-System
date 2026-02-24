import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// children = the page to show if allowed
// role = required role ("citizen" | "admin"), optional
const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useAuth(); // fixed: was "userRole", slice uses "role"

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;