import React, { useEffect } from "react";
import StudentSideBar from "../common/DashCommon/StudentSideBar";
import { useLocation } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentDash: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  return (
    <div className="dashboard-container flex">
      <ToastContainer />
      <StudentSideBar />
      {/* <Body /> */}
    </div>
  );
};

export default StudentDash;
