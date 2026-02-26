import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  FiHome,
  FiFileText,
  FiPlus,
  FiLogOut,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { logout } from "../auth/authSlice";
import useAuth from "../../hooks/useAuth";
import { getComplaints } from "../../api/complaints.api";
import logo from "../../assets/images/logo.png";

// ── Navbar ────────────────────────────────────────────────────────────────────
const DashboardNavbar = ({ user, onLogout }) => (
  <nav
    style={{
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      padding: "0 32px",
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
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img
        src={logo}
        alt="Logo"
        style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "contain" }}
      />
      <div>
        <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e1b4b" }}>
          Provincial Government
        </div>
        <div style={{ fontSize: "11px", color: "#7c3aed", fontWeight: 500 }}>
          Complaint System
        </div>
      </div>
    </div>

    {/* Center Nav Links */}
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Link
        to="/dashboard"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          background: "#111827",
          color: "#fff",
          padding: "9px 18px",
          borderRadius: "10px",
          fontWeight: 600,
          fontSize: "14px",
          textDecoration: "none",
        }}
      >
        <FiHome size={15} />
        Dashboard
      </Link>

      <Link
        to="/my-complaints"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          color: "#374151",
          padding: "9px 18px",
          borderRadius: "10px",
          fontWeight: 500,
          fontSize: "14px",
          textDecoration: "none",
        }}
      >
        <FiFileText size={15} />
        My Complaints
      </Link>

      <Link
        to="/submit-complaint"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          color: "#374151",
          padding: "9px 18px",
          borderRadius: "10px",
          fontWeight: 500,
          fontSize: "14px",
          textDecoration: "none",
        }}
      >
        <FiPlus size={15} />
        Submit Complaint
      </Link>
    </div>

    {/* Right — User + Logout */}
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#ede9fe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HiOutlineUserCircle size={22} color="#7c3aed" />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "13px", color: "#111827" }}>
            {user?.name || "User"}
          </div>
          <div style={{ fontSize: "11px", color: "#9ca3af" }}>Citizen</div>
        </div>
      </div>

      <button
        onClick={onLogout}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "9px 18px",
          borderRadius: "10px",
          border: "1.5px solid #fecaca",
          background: "#fff",
          color: "#dc2626",
          fontWeight: 600,
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        <FiLogOut size={14} />
        Logout
      </button>
    </div>
  </nav>
);

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon }) => (
  <div
    style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "16px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontWeight: 600, fontSize: "14px", color: "#374151" }}>{label}</span>
      {icon}
    </div>
    <div style={{ fontSize: "36px", fontWeight: 700, color: "#111827" }}>{value}</div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const CitizenDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: complaints = [], isLoading } = useQuery({
    queryKey: ["complaints"],
    queryFn: getComplaints,
    retry: false,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "pending").length;
  const inProgress = complaints.filter((c) => c.status === "in_progress").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;
  const recent = [...complaints].slice(0, 5);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', sans-serif" }}>
      <DashboardNavbar user={user} onLogout={handleLogout} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 32px" }}>

        {/* Welcome */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", marginBottom: "6px" }}>
            Welcome, {user?.name || "User"}!
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "15px" }}>
            Track and manage your complaints
          </p>
        </div>

        {/* Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <StatCard label="Total Complaints" value={isLoading ? "..." : total} icon={<FiFileText size={20} color="#9ca3af" />} />
          <StatCard label="Pending"          value={isLoading ? "..." : pending}     icon={<FiClock size={20} color="#f59e0b" />} />
          <StatCard label="In Progress"      value={isLoading ? "..." : inProgress}  icon={<FiAlertCircle size={20} color="#3b82f6" />} />
          <StatCard label="Resolved"         value={isLoading ? "..." : resolved}    icon={<FiCheckCircle size={20} color="#10b981" />} />
        </div>

        {/* Submit Button */}
        <Link
          to="/submit-complaint"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#111827",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "15px",
            textDecoration: "none",
            marginBottom: "32px",
          }}
        >
          <FiPlus size={18} />
          Submit New Complaint
        </Link>

        {/* Recent Complaints */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontWeight: 700, fontSize: "17px", color: "#111827" }}>
              Recent Complaints
            </h2>
            <Link
              to="/my-complaints"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                textDecoration: "none",
                border: "1px solid #e5e7eb",
                padding: "7px 16px",
                borderRadius: "8px",
              }}
            >
              View All
            </Link>
          </div>

          {isLoading ? (
            <p style={{ color: "#9ca3af", textAlign: "center", padding: "40px 0" }}>Loading...</p>
          ) : recent.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <FiFileText size={48} color="#d1d5db" style={{ marginBottom: "16px", display: "block", margin: "0 auto 16px" }} />
              <p style={{ color: "#9ca3af", fontSize: "15px", marginBottom: "20px" }}>
                No complaints yet
              </p>
              <Link
                to="/submit-complaint"
                style={{
                  display: "inline-block",
                  background: "#111827",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                Submit Your First Complaint
              </Link>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  {["Title", "Category", "Date", "Status"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "10px 12px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#9ca3af",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((c) => (
                  <tr key={c._id || c.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                    <td style={{ padding: "14px 12px", fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                      {c.title}
                    </td>
                    <td style={{ padding: "14px 12px", fontSize: "14px", color: "#6b7280" }}>
                      {c.category || "—"}
                    </td>
                    <td style={{ padding: "14px 12px", fontSize: "14px", color: "#6b7280" }}>
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: 600,
                          background:
                            c.status === "resolved" ? "#d1fae5" :
                            c.status === "in_progress" ? "#dbeafe" : "#fef3c7",
                          color:
                            c.status === "resolved" ? "#065f46" :
                            c.status === "in_progress" ? "#1e40af" : "#92400e",
                        }}
                      >
                        {c.status === "in_progress" ? "In Progress" :
                          c.status ? c.status.charAt(0).toUpperCase() + c.status.slice(1) : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;