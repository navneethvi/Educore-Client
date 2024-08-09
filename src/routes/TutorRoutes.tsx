import { Routes, Route } from "react-router-dom";

import TutorProtected from "./TutorProtected";

import TutorSignIn from "../components/tutor/TutorSignIn";
import TutorSignUp from "../components/tutor/TutorSignUp";
import VerifyEmail from "../components/tutor/VerifyEmail";
import ForgotPass from "../components/tutor/ForgotPass";
import ResetPass from "../components/tutor/ResetPass";
import Dashboard from "../components/common/DashCommon/Dashboard";

const TutorRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<TutorSignIn />} />
      <Route path="/verify-otp" element={<VerifyEmail />} />
      <Route path="/signup" element={<TutorSignUp />} />
      <Route path="/recover-account" element={<ForgotPass />} />    
      <Route path="/reset-pass" element={<ResetPass />} />   
      <Route
        path="/dashboard"
        element={
          <TutorProtected>
            <Dashboard />
          </TutorProtected>
        }
      />
    </Routes>
  );
};

export default TutorRoutes;
