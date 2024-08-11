import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./TutorSideBar.js";
import Body from './Body.js'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);
  return (
    <div className="dashboard-container flex justify-between">
      <ToastContainer />
      <SideBar />
      <Body />
    </div>
  );
};

export default Dashboard;
