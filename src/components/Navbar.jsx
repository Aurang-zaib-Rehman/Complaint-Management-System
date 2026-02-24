import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiBriefcase } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { isAuthenticated, role, user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav
      style={{
        background: "#fff",
        borderBottom: "1px solid #ede9fe",
        padding: "0 40px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "linear-gradient(135deg,#7c3aed,#9333ea)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FiBriefcase size={22} color="#fff" />
        </div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ fontWeight: 700, fontSize: "15px", color: "#1e1b4b", lineHeight: 1.2 }}>
            Provincial Government
          </div>
          <div style={{ fontSize: "11px", color: "#7c3aed", fontWeight: 500 }}>
            Complaint Management
          </div>
        </Link>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link to="/" style={{ color: "#374151", fontWeight: 500, fontSize: "14px", textDecoration: "none" }}>
          Home
        </Link>

        {isAuthenticated && (
          <Link
            to={role === "admin" ? "/admin" : "/dashboard"}
            style={{ color: "#374151", fontWeight: 500, fontSize: "14px", textDecoration: "none" }}
          >
            Dashboard
          </Link>
        )}

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              style={{ color: "#374151", fontWeight: 500, fontSize: "14px", textDecoration: "none" }}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#9333ea)",
                color: "#fff",
                padding: "10px 22px",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            <span style={{ fontSize: "13px", color: "#6b7280" }}>
              Hi, {user?.name || "User"}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "9px 20px",
                borderRadius: "10px",
                background: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;