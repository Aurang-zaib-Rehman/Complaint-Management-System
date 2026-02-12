// import useAuth from "../hooks/useAuth";

// const { isAuthenticated, role } = useAuth();

// console.log(isAuthenticated, role);



import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, role, logout, user } = useAuth();

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">MyApp</Link>
      </div>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>

        {isAuthenticated && (
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>
        )}

        {/* Role based links */}
        {isAuthenticated && role === "admin" && (
          <Link
            to="/admin"
            className="text-gray-700 hover:text-blue-600"
          >
            Admin Panel
          </Link>
        )}
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-600">
              Hi, {user?.name || "User"}
            </span>

            <button
              onClick={logout}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
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
