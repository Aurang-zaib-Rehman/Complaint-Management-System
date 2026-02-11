import { useDispatch } from "react-redux";
import { loginSuccess } from "./authSlice";

const dispatch = useDispatch();

const handleLogin = () => {
  dispatch(
    loginSuccess({
      user: { name: "Test User" },
      role: "citizen",
    })
  );
};
