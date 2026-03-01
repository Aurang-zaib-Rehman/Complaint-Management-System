import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  FiHome,
  FiFileText,
  FiPlus,
  FiLogOut,
  FiSearch,
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
          color: "#374151",
          padding: "9px 18px",
          borderRadius: "10px",
          fontWeight: 500,
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
          background: "#111827",
          color: "#fff",
          padding: "9px 18px",
          borderRadius: "10px",
          fontWeight: 600,
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

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const config = {
    resolved:    { bg: "#d1fae5", color: "#065f46", label: "Resolved" },
    in_progress: { bg: "#dbeafe", color: "#1e40af", label: "In Progress" },
    pending:     { bg: "#fef3c7", color: "#92400e", label: "Pending" },
  };
  const s = config[status] || config.pending;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        background: s.bg,
        color: s.color,
      }}
    >
      {s.label}
    </span>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const MyComplaints = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  // Filter logic
  const filtered = complaints.filter((c) => {
    const matchesSearch =
      search === "" ||
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.category?.toLowerCase().includes(search.toLowerCase()) ||
      c._id?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', sans-serif" }}>
      <DashboardNavbar user={user} onLogout={handleLogout} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 32px" }}>

        {/* Page Title */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", marginBottom: "6px" }}>
            My Complaints
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "15px" }}>
            View and track all your submitted complaints
          </p>
        </div>

        {/* Search + Filter */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          {/* Search Input */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "10px 16px" }}>
            <FiSearch size={16} color="#9ca3af" />
            <input
              type="text"
              placeholder="Search by ID, title, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#111827",
              }}
            />
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "10px 40px 10px 16px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              background: "#fff",
              fontSize: "14px",
              color: "#374151",
              fontWeight: 500,
              cursor: "pointer",
              outline: "none",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
            }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Complaints Table Card */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          {/* Count */}
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>
              {isLoading ? "..." : filtered.length} Complaints
            </span>
          </div>

          {isLoading ? (
            <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}>Loading...</p>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0", fontSize: "15px" }}>
              No complaints found
            </p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  {["ID", "Title", "Category", "Date", "Status"].map((h) => (
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
                {filtered.map((c) => (
                  <tr
                    key={c._id || c.id}
                    style={{ borderBottom: "1px solid #f9fafb" }}
                  >
                    <td style={{ padding: "14px 12px", fontSize: "13px", color: "#9ca3af", fontFamily: "monospace" }}>
                      #{(c._id || c.id || "").slice(-6).toUpperCase()}
                    </td>
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
                      <StatusBadge status={c.status || "pending"} />
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

export default MyComplaints;