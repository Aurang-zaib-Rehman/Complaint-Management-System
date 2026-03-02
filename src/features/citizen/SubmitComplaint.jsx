import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiHome, FiFileText, FiPlus, FiLogOut,
  FiArrowLeft, FiMapPin, FiNavigation, FiImage, FiVideo, FiX,
} from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { logout } from "../auth/authSlice";
import useAuth from "../../hooks/useAuth";
import { submitComplaint } from "../../api/complaints.api";
import logo from "../../assets/images/logo.png";

// ── Navbar ────────────────────────────────────────────────────────────────────
const DashboardNavbar = ({ user, onLogout }) => (
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
      <Link to="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "7px", color: "#374151", padding: "9px 18px", borderRadius: "10px", fontWeight: 500, fontSize: "14px", textDecoration: "none" }}>
        <FiHome size={15} /> Dashboard
      </Link>
      <Link to="/my-complaints" style={{ display: "inline-flex", alignItems: "center", gap: "7px", color: "#374151", padding: "9px 18px", borderRadius: "10px", fontWeight: 500, fontSize: "14px", textDecoration: "none" }}>
        <FiFileText size={15} /> My Complaints
      </Link>
      <Link to="/submit-complaint" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#111827", color: "#fff", padding: "9px 18px", borderRadius: "10px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
        <FiPlus size={15} /> Submit Complaint
      </Link>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <HiOutlineUserCircle size={22} color="#7c3aed" />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "13px", color: "#111827" }}>{user?.name || "User"}</div>
          <div style={{ fontSize: "11px", color: "#9ca3af" }}>Citizen</div>
        </div>
      </div>
      <button onClick={onLogout} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "10px", border: "1.5px solid #fecaca", background: "#fff", color: "#dc2626", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
        <FiLogOut size={14} /> Logout
      </button>
    </div>
  </nav>
);

// ── Section Header ─────────────────────────────────────────────────────────────
const SectionHeader = ({ number, title }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
    <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #7c3aed", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
      {number}
    </div>
    <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#7c3aed" }}>{title}</h2>
  </div>
);

// ── Input styles ───────────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%", padding: "12px 16px", borderRadius: "10px",
  border: "1px solid #e5e7eb", background: "#f9fafb",
  fontSize: "14px", color: "#111827", outline: "none",
  boxSizing: "border-box",
};
const labelStyle = { display: "block", fontWeight: 600, fontSize: "14px", color: "#111827", marginBottom: "8px" };
const selectStyle = { ...inputStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", cursor: "pointer" };

// ── Main Page ─────────────────────────────────────────────────────────────────
const SubmitComplaint = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const imageInputRef = useRef();
  const videoInputRef = useRef();

  const [form, setForm] = useState({
    title: "", category: "", district: "",
    department: "", description: "", locationAddress: "",
  });
  const [images, setImages] = useState([]);   // max 3
  const [video, setVideo] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useMutation({
    mutationFn: submitComplaint,
    onSuccess: () => {
      queryClient.invalidateQueries(["complaints"]);
      navigate("/dashboard");
    },
    onError: (err) => {
      setErrorMsg(err?.response?.data?.message || "Failed to submit complaint. Please try again.");
    },
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
      setErrorMsg("Maximum 3 images allowed."); return;
    }
    setImages([...images, ...files]);
  };

  const handleVideoAdd = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 50 * 1024 * 1024) {
      setErrorMsg("Video must be under 50MB."); return;
    }
    setVideo(file);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) { setErrorMsg("Geolocation not supported."); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm({ ...form, locationAddress: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}` });
      },
      () => setErrorMsg("Unable to get current location.")
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  const handleSubmit = () => {
    setErrorMsg("");
    const { title, category, district, department, description, locationAddress } = form;
    if (!title || !category || !district || !department || !description || !locationAddress) {
      setErrorMsg("Please fill in all required fields."); return;
    }
    if (description.length < 20) {
      setErrorMsg("Description must be at least 20 characters."); return;
    }
    mutation.mutate({ title, category, district, department, description, locationAddress });
  };

  const categories = ["Water Supply", "Electricity", "Roads & Infrastructure", "Sanitation", "Education", "Health", "Law & Order", "Other"];
  const districts  = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"];
  const departments = ["Public Works", "Water & Sanitation", "Electricity Board", "Health Department", "Education Department", "Police", "Municipal Committee", "Other"];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f3ff", fontFamily: "'Segoe UI', sans-serif" }}>
      <DashboardNavbar user={user} onLogout={handleLogout} />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px" }}>

        {/* Back to Dashboard */}
        <Link to="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#374151", fontSize: "14px", fontWeight: 500, textDecoration: "none", marginBottom: "24px" }}>
          <FiArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* Form Card */}
        <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

          {/* Purple Header */}
          <div style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea)", padding: "32px 40px" }}>
            <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: 800, marginBottom: "8px" }}>Submit New Complaint</h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}>
              Fill in the details below to submit your complaint. Add photos and videos for better documentation.
            </p>
          </div>

          <div style={{ padding: "40px" }}>

            {/* Error */}
            {errorMsg && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", borderRadius: "10px", padding: "12px 16px", fontSize: "13px", marginBottom: "28px" }}>
                {errorMsg}
              </div>
            )}

            {/* ── Section 1: Basic Information ── */}
            <SectionHeader number="1" title="Basic Information" />

            {/* Complaint Title */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Complaint Title *</label>
              <input name="title" type="text" placeholder="Brief, descriptive title of your complaint" value={form.title} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Category + District */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}>Category *</label>
                <select name="category" value={form.category} onChange={handleChange} style={selectStyle}>
                  <option value="">Select a category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>District *</label>
                <select name="district" value={form.district} onChange={handleChange} style={selectStyle}>
                  <option value="">Select your district</option>
                  {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Responsible Department */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Responsible Department *</label>
              <select name="department" value={form.department} onChange={handleChange} style={selectStyle}>
                <option value="">Select responsible department</option>
                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "36px" }}>
              <label style={labelStyle}>Description *</label>
              <textarea
                name="description"
                placeholder="Provide detailed information about your complaint..."
                value={form.description}
                onChange={handleChange}
                rows={5}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "6px" }}>
                {form.description.length} characters (minimum 20 required)
              </p>
            </div>

            {/* ── Section 2: Location Details ── */}
            <SectionHeader number="2" title="Location Details" />

            {/* Location Address */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "6px" }}>
                <FiMapPin size={15} color="#374151" /> Location Address *
              </label>
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  name="locationAddress"
                  type="text"
                  placeholder="Enter your location address"
                  value={form.locationAddress}
                  onChange={handleChange}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "12px 18px", borderRadius: "10px", border: "1px solid #e5e7eb", background: "#fff", color: "#111827", fontWeight: 600, fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  <FiNavigation size={14} /> Use Current
                </button>
              </div>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "6px" }}>
                Enter the address or use your current location
              </p>
            </div>

            {/* Location Tips */}
            <div style={{ background: "#f5f3ff", border: "1px solid #ede9fe", borderRadius: "12px", padding: "20px 24px", marginBottom: "36px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <FiMapPin size={18} color="#7c3aed" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: "14px", color: "#111827", marginBottom: "10px" }}>Location Tips</p>
                  {[
                    `Click "Use Current" to auto-detect your location`,
                    "Or manually enter the complete address",
                    "Include landmarks for better identification",
                  ].map((tip, i) => (
                    <p key={i} style={{ fontSize: "13px", color: "#7c3aed", marginBottom: "4px" }}>• {tip}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Section 3: Media Upload ── */}
            <SectionHeader number="3" title="Media Upload (Optional)" />

            {/* Upload Images */}
            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>Upload Images (Max 3)</label>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {images.map((img, i) => (
                  <div key={i} style={{ position: "relative", width: "120px", height: "120px", borderRadius: "10px", overflow: "hidden", border: "1px solid #e5e7eb" }}>
                    <img src={URL.createObjectURL(img)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      style={{ position: "absolute", top: "4px", right: "4px", background: "#111827", border: "none", borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    >
                      <FiX size={12} color="#fff" />
                    </button>
                  </div>
                ))}
                {images.length < 3 && (
                  <button
                    type="button"
                    onClick={() => imageInputRef.current.click()}
                    style={{ width: "120px", height: "120px", borderRadius: "10px", border: "2px dashed #c4b5fd", background: "#faf5ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", color: "#7c3aed", fontWeight: 600, fontSize: "13px" }}
                  >
                    <FiImage size={24} color="#7c3aed" />
                    Add Image
                  </button>
                )}
              </div>
              <input ref={imageInputRef} type="file" accept="image/*" multiple onChange={handleImageAdd} style={{ display: "none" }} />
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "8px" }}>
                Accepted formats: JPG, PNG, GIF. Max size: 5MB per image.
              </p>
            </div>

            {/* Upload Video */}
            <div style={{ marginBottom: "40px" }}>
              <label style={labelStyle}>Upload Video (Optional)</label>
              {video ? (
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", border: "1px solid #e5e7eb", borderRadius: "10px", background: "#f9fafb" }}>
                  <FiVideo size={20} color="#7c3aed" />
                  <span style={{ fontSize: "13px", color: "#374151", flex: 1 }}>{video.name}</span>
                  <button onClick={() => setVideo(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => videoInputRef.current.click()}
                  style={{ width: "100%", padding: "32px", borderRadius: "10px", border: "2px dashed #c4b5fd", background: "#faf5ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer", color: "#7c3aed", fontWeight: 600, fontSize: "14px" }}
                >
                  <FiVideo size={28} color="#7c3aed" />
                  Add Video
                </button>
              )}
              <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoAdd} style={{ display: "none" }} />
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "8px" }}>
                Accepted formats: MP4, MOV, AVI. Max size: 50MB.
              </p>
            </div>

            {/* ── Action Buttons ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Link
                to="/dashboard"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "15px", borderRadius: "12px", border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={mutation.isPending}
                style={{ padding: "15px", borderRadius: "12px", border: "none", background: mutation.isPending ? "#a78bfa" : "linear-gradient(135deg,#7c3aed,#9333ea)", color: "#fff", fontWeight: 700, fontSize: "15px", cursor: mutation.isPending ? "not-allowed" : "pointer", boxShadow: "0 6px 20px rgba(124,58,237,0.3)" }}
              >
                {mutation.isPending ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;