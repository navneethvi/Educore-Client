import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePage from "./pages/HomePage";
import StudentRoutes from "./routes/StudentRoutes";
import TutorRoutes from "./routes/TutorRoutes";
import AdminRoutes from "./routes/AdminRoutes";

import { motion, AnimatePresence } from "framer-motion";

import Loading from "./framer/Loading";

import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <Loading key="loading" />
      ) : (
        <GoogleOAuthProvider clientId="225204250762-6rbie7h89mpk50bs5ivtk2tjksq5s0m2.apps.googleusercontent.com">
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/*" element={<StudentRoutes />} />
                <Route path="/tutor/*" element={<TutorRoutes />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
              </Routes>
            </BrowserRouter>
          </motion.div>
        </GoogleOAuthProvider>
      )}
    </AnimatePresence>
  );
}

export default App;
