import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { loginSuccess } from "./authSlice";
import { loginUser } from "../../api/auth.api";
import logo from "../../assets/images/logo.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen"); // "citizen" | "admin"
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // store token
      localStorage.setItem("token", data.token);
      // update redux
      dispatch(loginSuccess({ user: data.user, role: data.user.role }));
      // redirect by role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (err) => {
      setErrorMsg(
        err?.response?.data?.message || "Login failed. Please check your credentials."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    mutation.mutate({ email, password });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg,#f5f3ff 0%,#ede9fe 50%,#fdf4ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 8px 48px rgba(124,58,237,0.12)",
        }}
      >
        {/* Back to Home */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#7c3aed",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            marginBottom: "24px",
          }}
        >
          <FiArrowLeft size={15} />
          Back to Home
        </Link>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "64px", height: "64px", borderRadius: "18px", objectFit: "contain", margin: "0 auto 20px", display: "block" }}
          />
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#7c3aed",
              marginBottom: "6px",
            }}
          >
            Welcome Back
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            Sign in to access your account
          </p>
        </div>

        {/* Error */}
        {errorMsg && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "13px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: "14px",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: "12px",
                border: "1.5px solid #e5e7eb",
                background: "#f9f7ff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                color: "#111827",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: "14px",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: "12px",
                border: "1.5px solid #e5e7eb",
                background: "#f9f7ff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                color: "#111827",
              }}
            />
          </div>

          {/* Login As */}
          <div style={{ marginBottom: "28px" }}>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: "14px",
                color: "#111827",
                marginBottom: "12px",
              }}
            >
              Login As
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {/* Citizen */}
              <button
                type="button"
                onClick={() => setRole("citizen")}
                style={{
                  padding: "16px 12px",
                  borderRadius: "12px",
                  border: role === "citizen" ? "2px solid #7c3aed" : "1.5px solid #e5e7eb",
                  background: role === "citizen" ? "#f5f3ff" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                }}
              >
                <HiOutlineUserCircle size={26} color={role === "citizen" ? "#7c3aed" : "#9ca3af"} />
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "13px",
                    color: role === "citizen" ? "#7c3aed" : "#6b7280",
                  }}
                >
                  Citizen
                </span>
              </button>

              {/* Officer */}
              <button
                type="button"
                onClick={() => setRole("admin")}
                style={{
                  padding: "16px 12px",
                  borderRadius: "12px",
                  border: role === "admin" ? "2px solid #7c3aed" : "1.5px solid #e5e7eb",
                  background: role === "admin" ? "#f5f3ff" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                }}
              >
                <MdOutlineAdminPanelSettings size={26} color={role === "admin" ? "#7c3aed" : "#9ca3af"} />
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "13px",
                    color: role === "admin" ? "#7c3aed" : "#6b7280",
                  }}
                >
                  Officer
                </span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              background: mutation.isPending
                ? "#a78bfa"
                : "linear-gradient(135deg,#7c3aed,#9333ea)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "15px",
              border: "none",
              cursor: mutation.isPending ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 6px 20px rgba(124,58,237,0.3)",
            }}
          >
            <FiArrowRight size={18} />
            {mutation.isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer link */}
        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            fontSize: "13px",
            color: "#9ca3af",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#7c3aed", fontWeight: 600, textDecoration: "none" }}
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;