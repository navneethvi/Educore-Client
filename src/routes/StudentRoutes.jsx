import { Route, Routes } from "react-router-dom";

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
    </Routes>
  );
};

export default StudentRoutes;