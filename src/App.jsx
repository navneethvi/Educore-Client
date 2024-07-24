import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUp from "./components/student/SignUp";
import ForgotPass from "./components/student/ForgotPass";
import ResetPass from "./components/student/ResetPass";
import VerifyEmail from "./components/student/VerifyEmail";
import SelectInterests from "./components/student/SelectInterests";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recover-account" element={<ForgotPass />} />
          <Route path="/reset-pass" element={<ResetPass />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/select-interests" element={<SelectInterests />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
