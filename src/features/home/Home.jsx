import { Link } from "react-router-dom";
import {
  FiFileText,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiBriefcase,
  FiZap,
  FiArrowRight,
} from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import logo from "../../assets/images/logo.png";

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => (
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
      <img src={logo} alt="Logo" style={{ width: "44px", height: "44px", borderRadius: "12px", objectFit: "contain" }} />
      <div>
        <div style={{ fontWeight: 700, fontSize: "15px", color: "#1e1b4b", lineHeight: 1.2 }}>
          Provincial Government
        </div>
        <div style={{ fontSize: "11px", color: "#7c3aed", fontWeight: 500 }}>
          Complaint Management
        </div>
      </div>
    </div>

    {/* Right */}
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Link
        to="/login"
        style={{
          color: "#374151",
          fontWeight: 500,
          fontSize: "14px",
          textDecoration: "none",
        }}
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
    </div>
  </nav>
);

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section
    style={{
      minHeight: "calc(100vh - 64px)",
      background: "linear-gradient(160deg,#f5f3ff 0%,#ede9fe 40%,#faf5ff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "60px 24px",
    }}
  >
    <div style={{ maxWidth: "700px" }}>
      <h1
        style={{
          fontSize: "clamp(42px,6vw,68px)",
          fontWeight: 800,
          color: "#6d28d9",
          lineHeight: 1.1,
          marginBottom: "24px",
          letterSpacing: "-1px",
        }}
      >
        Your Voice Matters
      </h1>

      <p
        style={{
          color: "#6b7280",
          fontSize: "17px",
          lineHeight: 1.7,
          marginBottom: "40px",
          maxWidth: "560px",
          margin: "0 auto 40px",
        }}
      >
        A transparent, efficient, and modern platform for citizens to report
        issues and track their resolution in real-time. Upload photos, videos,
        and pinpoint exact locations on the map.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
        <Link
          to="/register"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg,#7c3aed,#9333ea)",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "15px",
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
          }}
        >
          <HiOutlineUserGroup size={18} />
          Register as Citizen
        </Link>
        <Link
          to="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#fff",
            color: "#374151",
            border: "1.5px solid #d1d5db",
            padding: "14px 28px",
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "15px",
            textDecoration: "none",
          }}
        >
          <MdOutlineAdminPanelSettings size={18} />
          Officer Login
        </Link>
      </div>
    </div>
  </section>
);

// ── Feature Cards ─────────────────────────────────────────────────────────────
const features = [
  {
    icon: <FiFileText size={24} color="#fff" />,
    iconBg: "linear-gradient(135deg,#3b82f6,#60a5fa)",
    title: "Submit with Media",
    desc: "Submit complaints with photos, videos, and exact GPS location from interactive maps.",
  },
  {
    icon: <FiTrendingUp size={24} color="#fff" />,
    iconBg: "linear-gradient(135deg,#7c3aed,#a855f7)",
    title: "Real-time Tracking",
    desc: "Monitor complaint status with live updates and detailed remarks from government officials.",
  },
  {
    icon: <FiCheckCircle size={24} color="#fff" />,
    iconBg: "linear-gradient(135deg,#ec4899,#f43f5e)",
    title: "Quick Resolution",
    desc: "Get timely responses from the right departments until your issue is completely resolved.",
  },
];

const Features = () => (
  <section style={{ padding: "80px 24px", background: "#fff" }}>
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
        gap: "24px",
      }}
    >
      {features.map((f, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            border: "1px solid #f3f4f6",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: f.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {f.icon}
          </div>
          <h3 style={{ fontWeight: 700, fontSize: "18px", color: "#111827", marginBottom: "10px" }}>
            {f.title}
          </h3>
          <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.7 }}>{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// ── How It Works ──────────────────────────────────────────────────────────────
const steps = [
  { n: 1, label: "Register", sub: "Create your account in seconds" },
  { n: 2, label: "Submit", sub: "File complaint with media & location" },
  { n: 3, label: "Track", sub: "Monitor status in real-time" },
  { n: 4, label: "Resolve", sub: "Get your issue fixed" },
];

const HowItWorks = () => (
  <section style={{ padding: "60px 24px", background: "#f5f3ff" }}>
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 4px 32px rgba(124,58,237,0.08)",
      }}
    >
      {/* Header band */}
      <div
        style={{
          background: "linear-gradient(135deg,#7c3aed,#9333ea)",
          padding: "32px 40px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "26px", marginBottom: "6px" }}>
          How It Works
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}>
          Simple, fast, and transparent process
        </p>
      </div>

      {/* Steps */}
      <div
        style={{
          padding: "48px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "16px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {steps.map((s, i) => (
          <div key={i} style={{ position: "relative" }}>
            {/* connector line */}
            {i < steps.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  left: "calc(50% + 32px)",
                  width: "calc(100% - 64px)",
                  height: "1px",
                  background: "#ddd6fe",
                  zIndex: 0,
                }}
              />
            )}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "linear-gradient(135deg,#7c3aed,#9333ea)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {s.n}
            </div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827", marginBottom: "4px" }}>
              {s.label}
            </div>
            <div style={{ color: "#9ca3af", fontSize: "12px" }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { icon: <FiFileText size={28} color="#3b82f6" />, value: "1,234", label: "Total Complaints" },
  { icon: <FiCheckCircle size={28} color="#10b981" />, value: "856", label: "Resolved" },
  { icon: <FiClock size={28} color="#f59e0b" />, value: "245", label: "In Progress" },
  { icon: <FiBriefcase size={28} color="#374151" />, value: "5", label: "Districts" },
];

const Stats = () => (
  <section style={{ padding: "60px 24px", background: "#f9fafb" }}>
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: "20px",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "32px 24px",
            textAlign: "center",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ marginBottom: "12px" }}>{s.icon}</div>
          <div style={{ fontSize: "32px", fontWeight: 800, color: "#6d28d9", marginBottom: "6px" }}>
            {s.value}
          </div>
          <div style={{ color: "#6b7280", fontSize: "13px" }}>{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

// ── CTA ───────────────────────────────────────────────────────────────────────
const CTA = () => (
  <section style={{ padding: "60px 24px", background: "#f5f3ff" }}>
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "linear-gradient(135deg,#7c3aed,#9333ea)",
        borderRadius: "24px",
        padding: "60px 40px",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <FiZap size={36} color="rgba(255,255,255,0.9)" />
      </div>
      <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: 700, marginBottom: "12px" }}>
        Ready to Make a Difference?
      </h2>
      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
        Join thousands of citizens working together to improve our communities. Your voice matters!
      </p>
      <Link
        to="/register"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "#fff",
          color: "#7c3aed",
          padding: "14px 32px",
          borderRadius: "12px",
          fontWeight: 600,
          fontSize: "15px",
          textDecoration: "none",
        }}
      >
        Get Started Now <FiArrowRight size={16} />
      </Link>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer
    style={{
      background: "#111827",
      color: "#9ca3af",
      textAlign: "center",
      padding: "24px",
      fontSize: "13px",
    }}
  >
    © {new Date().getFullYear()} Provincial Government Complaint System. All rights reserved.
  </footer>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Features />
    <HowItWorks />
    <Stats />
    <CTA />
    <Footer />
  </>
);

export default Home;