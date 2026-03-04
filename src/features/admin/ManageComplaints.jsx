import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiLogOut, FiFileText, FiSearch, FiUser, FiMail,
  FiMapPin, FiCalendar, FiEdit2,
} from "react-icons/fi";
import { HiOutlineUserCircle, HiOutlineViewGrid } from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { logout } from "../auth/authSlice";
import useAuth from "../../hooks/useAuth";
import { getComplaints } from "../../api/complaints.api";
import logo from "../../assets/images/logo.png";

// ── Navbar ────────────────────────────────────────────────────────────────────
const AdminNavbar = ({ user, onLogout }) => (
  <nav style={{
    background: "#fff", borderBottom: "1px solid #e5e7eb",
    padding: "0 32px", height: "64px", display: "flex",
    alignItems: "center", justifyContent: "space-between",
    position: "sticky", top: 0, zIndex: 100,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img src={logo} alt="Logo" style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "contain" }} />
      <div>
        <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e1b4b" }}>Provincial Government</div>
        <div style={{ fontSize: "11px", color: "#7c3aed", fontWeight: 500 }}>Complaint System</div>
      </div>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Link to="/admin" style={{ display: "inline-flex", alignItems: "center", gap: "7px", color: "#374151", padding: "9px 18px", borderRadius: "10px", fontWeight: 500, fontSize: "14px", textDecoration: "none" }}>
        <HiOutlineViewGrid size={16} /> Dashboard
      </Link>
      <Link to="/admin/complaints" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#111827", color: "#fff", padding: "9px 18px", borderRadius: "10px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
        <FiFileText size={15} /> Manage Complaints
      </Link>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <HiOutlineUserCircle size={22} color="#7c3aed" />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "13px", color: "#111827" }}>{user?.name || "Admin"}</div>
          <div style={{ fontSize: "11px", color: "#9ca3af" }}>Admin</div>
        </div>
      </div>
      <button onClick={onLogout} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "10px", border: "1.5px solid #fecaca", background: "#fff", color: "#dc2626", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
        <FiLogOut size={14} /> Logout
      </button>
    </div>
  </nav>
);

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = {
    resolved:    { bg: "#d1fae5", color: "#065f46", label: "Resolved" },
    in_progress: { bg: "#dbeafe", color: "#1e40af", label: "In Progress" },
    pending:     { bg: "#fef3c7", color: "#92400e", label: "Pending" },
  };
  const s = cfg[status] || cfg.pending;
  return (
    <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
};

// ── Category Tag ──────────────────────────────────────────────────────────────
const CategoryTag = ({ label }) => (
  <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 500, background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}>
    {label}
  </span>
);

// ── Complaint Card ────────────────────────────────────────────────────────────
const ComplaintCard = ({ complaint }) => {
  const [expanded, setExpanded] = useState(false);
  const [newStatus, setNewStatus] = useState(complaint.status || "pending");
  const [remarks, setRemarks] = useState(complaint.remarks || "");
  const queryClient = useQueryClient();

  // TODO: wire to real API endpoint when backend is ready
  const handleSave = () => {
    // updateComplaintStatus({ id: complaint._id, status: newStatus, remarks })
    queryClient.invalidateQueries(["complaints"]);
    setExpanded(false);
  };

  const metaStyle = { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280" };
  const selectStyle = {
    width: "100%", padding: "12px 16px", borderRadius: "10px",
    border: "1px solid #e5e7eb", background: "#f9fafb",
    fontSize: "14px", color: "#111827", outline: "none",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
    cursor: "pointer",
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", marginBottom: "16px" }}>

      {/* Title + Status */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
        <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111827" }}>
          {complaint.title || "Untitled Complaint"}
        </h3>
        <StatusBadge status={complaint.status} />
      </div>

      {/* Description */}
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", lineHeight: 1.6 }}>
        {complaint.description || "No description provided."}
      </p>

      {/* Meta Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", marginBottom: "16px" }}>
        {/* Left */}
        <div style={metaStyle}>
          <span style={{ fontWeight: 600, color: "#374151" }}>ID:</span>
          <span>{complaint._id ? complaint._id.slice(-6).toUpperCase() : "—"}</span>
        </div>
        <div style={metaStyle}>
          <FiUser size={14} />
          <span>{complaint.citizenName || complaint.user?.name || "Unknown"}</span>
        </div>

        <div style={metaStyle}>
          <FiCalendar size={14} />
          <span>{complaint.createdAt ? new Date(complaint.createdAt).toLocaleString() : "—"}</span>
        </div>
        <div style={metaStyle}>
          <FiMail size={14} />
          <span>{complaint.citizenEmail || complaint.user?.email || "—"}</span>
        </div>

        <div style={metaStyle}>
          <FiMapPin size={14} />
          <span>{complaint.locationAddress || complaint.location || "—"}</span>
        </div>
        <div>
          <CategoryTag label={complaint.category || "General"} />
        </div>

        <div style={metaStyle}>
          <MdOutlineBusinessCenter size={14} />
          <span>{complaint.department || "—"}</span>
        </div>
      </div>

      {/* Officer Remarks (collapsed view) */}
      {!expanded && complaint.remarks && (
        <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", fontSize: "13px", color: "#374151" }}>
          <span style={{ fontWeight: 600 }}>Officer Remarks: </span>{complaint.remarks}
        </div>
      )}

      {/* Update Status Panel (expanded) */}
      {expanded && (
        <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          {/* Status dropdown */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontWeight: 600, fontSize: "13px", color: "#374151", marginBottom: "8px" }}>Update Status</label>
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} style={selectStyle}>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Remarks textarea */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: 600, fontSize: "13px", color: "#374151", marginBottom: "8px" }}>Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              placeholder="Add officer remarks..."
              style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e5e7eb", background: "#fff", fontSize: "14px", color: "#111827", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }}
            />
          </div>

          {/* Save / Cancel */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleSave}
              style={{ padding: "10px 24px", borderRadius: "10px", background: "#111827", color: "#fff", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer" }}
            >
              Save Changes
            </button>
            <button
              onClick={() => setExpanded(false)}
              style={{ padding: "10px 20px", borderRadius: "10px", background: "#fff", color: "#374151", fontWeight: 600, fontSize: "14px", border: "1px solid #e5e7eb", cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Update Status Button */}
      {!expanded && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => setExpanded(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "10px", border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}
          >
            <FiEdit2 size={14} /> Update Status
          </button>
        </div>
      )}
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const ManageComplaints = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

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
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      c.title?.toLowerCase().includes(q) ||
      c._id?.toLowerCase().includes(q) ||
      c.citizenName?.toLowerCase().includes(q) ||
      c.user?.name?.toLowerCase().includes(q);
    const matchStatus   = statusFilter === "all"     || c.status === statusFilter;
    const matchCategory = categoryFilter === "all"   || c.category === categoryFilter;
    const matchDistrict = districtFilter === "all"   || c.district === districtFilter;
    const matchDept     = departmentFilter === "all" || c.department === departmentFilter;
    return matchSearch && matchStatus && matchCategory && matchDistrict && matchDept;
  });

  const dropStyle = {
    padding: "10px 36px 10px 14px", borderRadius: "10px",
    border: "1px solid #e5e7eb", background: "#fff",
    fontSize: "13px", color: "#374151", fontWeight: 500,
    cursor: "pointer", outline: "none", appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
  };

  const categories  = ["Water Supply", "Electricity", "Roads & Infrastructure", "Sanitation", "Education", "Health Services", "Law & Order", "Other"];
  const districts   = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"];
  const departments = ["Public Works", "Water & Sanitation", "Electricity Board", "Health Department", "Education Department", "Police", "Municipal Committee", "Other"];

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', sans-serif" }}>
      <AdminNavbar user={user} onLogout={handleLogout} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 32px" }}>

        {/* Page Title */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", marginBottom: "6px" }}>Manage Complaints</h1>
          <p style={{ color: "#9ca3af", fontSize: "15px" }}>View, filter, and update complaint status</p>
        </div>

        {/* Search + Filters */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "20px 24px", marginBottom: "20px" }}>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "10px 16px", marginBottom: "16px" }}>
            <FiSearch size={16} color="#9ca3af" />
            <input
              type="text"
              placeholder="Search by ID, title, or citizen name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "14px", color: "#111827" }}
            />
          </div>

          {/* Filter dropdowns */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={dropStyle}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={dropStyle}>
              <option value="all">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <select value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)} style={dropStyle}>
              <option value="all">All Districts</option>
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>

            <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} style={dropStyle}>
              <option value="all">All Departments</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Results */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px" }}>
          <h2 style={{ fontWeight: 700, fontSize: "16px", color: "#111827", marginBottom: "20px" }}>
            {isLoading ? "Loading..." : `${filtered.length} Complaint${filtered.length !== 1 ? "s" : ""} Found`}
          </h2>

          {isLoading ? (
            <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}>Loading complaints...</p>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0", fontSize: "15px" }}>No complaints found</p>
          ) : (
            filtered.map((c) => <ComplaintCard key={c._id || c.id} complaint={c} />)
          )}
        </div>

      </div>
    </div>
  );
};

export default ManageComplaints;