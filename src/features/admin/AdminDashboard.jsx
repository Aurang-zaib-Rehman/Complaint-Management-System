import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  FiLogOut, FiFileText, FiClock, FiTrendingUp, FiCheckCircle,
} from "react-icons/fi";
import { MdOutlineAdminPanelSettings, MdOutlineDashboard } from "react-icons/md";
import { HiOutlineUserCircle, HiOutlineViewGrid } from "react-icons/hi";
import { logout } from "../auth/authSlice";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/images/logo.png";

// ── Mock data (replace with API later) ───────────────────────────────────────
const categoryData = [
  { name: "Electricity",           count: 1 },
  { name: "Water Supply",          count: 1 },
  { name: "Roads & Infrastructure",count: 2 },
  { name: "Health Services",       count: 1 },
  { name: "Sanitation",            count: 1 },
];

const districtData = [
  { name: "District A", count: 2 },
  { name: "District B", count: 2 },
  { name: "District C", count: 1 },
  { name: "District D", count: 1 },
];

const statusData = [
  { name: "Pending",     value: 2, color: "#f59e0b" },
  { name: "In Progress", value: 2, color: "#3b82f6" },
  { name: "Resolved",    value: 2, color: "#10b981" },
];

const topCategories = [
  { rank: 1, name: "Electricity",            count: 1 },
  { rank: 2, name: "Water Supply",           count: 1 },
  { rank: 3, name: "Roads & Infrastructure", count: 2 },
  { rank: 4, name: "Health Services",        count: 1 },
  { rank: 5, name: "Sanitation",             count: 1 },
];

const stats = {
  total:      6,
  pending:    2,
  inProgress: 2,
  resolved:   2,
};

// ── Navbar ────────────────────────────────────────────────────────────────────
const AdminNavbar = ({ user, onLogout }) => (
  <nav style={{
    background: "#fff", borderBottom: "1px solid #e5e7eb",
    padding: "0 32px", height: "64px", display: "flex",
    alignItems: "center", justifyContent: "space-between",
    position: "sticky", top: 0, zIndex: 100,
  }}>
    {/* Logo */}
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img src={logo} alt="Logo" style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "contain" }} />
      <div>
        <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e1b4b" }}>Provincial Government</div>
        <div style={{ fontSize: "11px", color: "#7c3aed", fontWeight: 500 }}>Complaint System</div>
      </div>
    </div>

    {/* Center links */}
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Link to="/admin" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#111827", color: "#fff", padding: "9px 18px", borderRadius: "10px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
        <HiOutlineViewGrid size={16} /> Dashboard
      </Link>
      <Link to="/admin/complaints" style={{ display: "inline-flex", alignItems: "center", gap: "7px", color: "#374151", padding: "9px 18px", borderRadius: "10px", fontWeight: 500, fontSize: "14px", textDecoration: "none" }}>
        <FiFileText size={15} /> Manage Complaints
      </Link>
    </div>

    {/* Right */}
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

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon }) => (
  <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontWeight: 600, fontSize: "14px", color: "#374151" }}>{label}</span>
      {icon}
    </div>
    <div style={{ fontSize: "36px", fontWeight: 700, color: "#111827" }}>{value}</div>
    <div style={{ fontSize: "12px", color: "#9ca3af" }}>{sub}</div>
  </div>
);

// ── Custom Pie Label ──────────────────────────────────────────────────────────
const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 40;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const color = name === "Pending" ? "#f59e0b" : name === "In Progress" ? "#3b82f6" : "#10b981";
  return (
    <text x={x} y={y} fill={color} textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600}>
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("category");

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  const resolutionRate = Math.round((stats.resolved / stats.total) * 100);

  const tabs = [
    { key: "category", label: "By Category" },
    { key: "district", label: "By District" },
    { key: "status",   label: "By Status"   },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', sans-serif" }}>
      <AdminNavbar user={user} onLogout={handleLogout} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 32px" }}>

        {/* Page Title */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", marginBottom: "6px" }}>Admin Dashboard</h1>
          <p style={{ color: "#9ca3af", fontSize: "15px" }}>Overview of all complaints and statistics</p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", marginBottom: "36px" }}>
          <StatCard label="Total Complaints" value={stats.total}      sub="All time"       icon={<FiFileText size={20} color="#9ca3af" />} />
          <StatCard label="Pending"          value={stats.pending}    sub="Awaiting action" icon={<FiClock size={20} color="#f59e0b" />} />
          <StatCard label="In Progress"      value={stats.inProgress} sub="Being handled"  icon={<FiTrendingUp size={20} color="#3b82f6" />} />
          <StatCard label="Resolved"         value={stats.resolved}   sub="Completed"      icon={<FiCheckCircle size={20} color="#10b981" />} />
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: "9px 20px", borderRadius: "999px",
                border: "1px solid #e5e7eb",
                background: activeTab === t.key ? "#111827" : "#fff",
                color: activeTab === t.key ? "#fff" : "#374151",
                fontWeight: 600, fontSize: "13px", cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Chart Card */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", marginBottom: "24px" }}>

          {/* By Category */}
          {activeTab === "category" && (
            <>
              <h3 style={{ fontWeight: 700, fontSize: "16px", color: "#111827", marginBottom: "24px" }}>Complaints by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} angle={-20} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" name="Complaints" fill="#3b82f6" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {/* By District */}
          {activeTab === "district" && (
            <>
              <h3 style={{ fontWeight: 700, fontSize: "16px", color: "#111827", marginBottom: "24px" }}>Complaints by District</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={districtData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" name="Complaints" fill="#10b981" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {/* By Status */}
          {activeTab === "status" && (
            <>
              <h3 style={{ fontWeight: 700, fontSize: "16px", color: "#111827", marginBottom: "24px" }}>Complaints by Status</h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    labelLine={true}
                    label={renderPieLabel}
                  >
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </>
          )}
        </div>

        {/* Bottom Row — Top Categories + Resolution Rate */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

          {/* Top Categories */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <FiFileText size={18} color="#374151" />
              <h3 style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>Top Categories</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {topCategories.map((c) => (
                <div key={c.rank} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "#9ca3af", fontSize: "13px", fontWeight: 500, width: "24px" }}>#{c.rank}</span>
                    <span style={{ fontSize: "14px", color: "#111827", fontWeight: 500 }}>{c.name}</span>
                  </div>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#1e40af" }}>
                    {c.count}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resolution Rate */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <HiOutlineUserCircle size={20} color="#374151" />
              <h3 style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>Resolution Rate</h3>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>Overall Progress</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{resolutionRate}%</span>
              </div>
              <div style={{ width: "100%", height: "10px", borderRadius: "999px", background: "#e5e7eb", overflow: "hidden" }}>
                <div style={{ width: `${resolutionRate}%`, height: "100%", borderRadius: "999px", background: "#10b981", transition: "width 0.5s" }} />
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", textAlign: "center" }}>
              <div>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#f59e0b" }}>{stats.pending}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>Pending</div>
              </div>
              <div>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#3b82f6" }}>{stats.inProgress}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>In Progress</div>
              </div>
              <div>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#10b981" }}>{stats.resolved}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>Resolved</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;