// import { Routes, Route } from "react-router-dom";
// import Home from "../features/home/Home";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//     </Routes>
//   );
// };

// export default AppRoutes;













import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/auth/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
};

export default AppRoutes;
