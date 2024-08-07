import { Routes, Route } from "react-router-dom";
import AdminSignIn from "../components/admin/SignIn";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<AdminSignIn />} />
    </Routes>
  );
};

export default AdminRoutes;
