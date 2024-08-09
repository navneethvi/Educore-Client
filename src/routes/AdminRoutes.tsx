import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSignIn from "../components/admin/SignIn";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/signin" element={<AdminSignIn />} />
    </Routes>
  );
};

export default AdminRoutes;