import useAuth from "../hooks/useAuth";

const { isAuthenticated, role } = useAuth();

console.log(isAuthenticated, role);
