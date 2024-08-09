import { Route, Routes } from "react-router-dom";

import StudentProtected from "./StudentProtected";

import StudentDash from "../components/student/StudentDash";
import SignIn from "../components/student/SignIn";
import SignUp from "../components/student/SignUp";
import ForgotPass from "../components/student/ForgotPass";
import ResetPass from "../components/student/ResetPass";
import VerifyEmail from "../components/student/VerifyEmail";
import SelectInterests from "../components/student/SelectInterests";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/recover-account" element={<ForgotPass />} />
      <Route path="/reset-pass" element={<ResetPass />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/select-interests" element={<SelectInterests />} />
      <Route
        path="/dashboard"
        element={
          <StudentProtected>
            <StudentDash />
          </StudentProtected>
        }
      />
    </Routes>
  );
};

export default StudentRoutes;
