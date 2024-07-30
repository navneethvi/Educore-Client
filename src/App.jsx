import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Common

import HomePage from "./pages/HomePage";

// Student

import SignIn from "./components/student/SignIn";
import SignUp from "./components/student/SignUp";
import ForgotPass from "./components/student/ForgotPass";
import ResetPass from "./components/student/ResetPass";
import VerifyEmail from "./components/student/VerifyEmail";
import SelectInterests from "./components/student/SelectInterests";

// Tutor

import TutorSignIn from "./components/tutor/TutorSignIn";
import TutorSignUp from "./components/tutor/TutorSignUp";
import Dashboard from "./components/common/DashCommon/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Common */}
          <Route path="/" element={<HomePage />} />

          {/* Student */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recover-account" element={<ForgotPass />} />
          <Route path="/reset-pass" element={<ResetPass />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/select-interests" element={<SelectInterests />} />

          {/* Tutor */}

          <Route path="/tutor" element={<Dashboard />} />
          <Route path="/tutor/signin" element={<TutorSignIn />} />
          <Route path="/tutor/signup" element={<TutorSignUp />} />
        </Routes>
        <ToastContainer
          position="top-right" // Position the toasts in the top-right corner
          autoClose={5000} // Auto close after 5 seconds
          hideProgressBar={false} // Show progress bar
          newestOnTop={false} // Show newest toast on top
          closeOnClick // Close on click
          rtl={false} // Right-to-left text direction
          pauseOnFocusLoss // Pause on window focus loss
          draggable // Make draggable
          pauseOnHover // Pause on hover
          theme="light" // Theme for the toast
        />
      </BrowserRouter>
    </>
  );
}

export default App;
