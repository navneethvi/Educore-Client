
import { Routes, Route } from 'react-router-dom'

import TutorSignIn from "../components/tutor/TutorSignIn";
import TutorSignUp from "../components/tutor/TutorSignUp";
import Dashboard from "../components/common/DashCommon/Dashboard";

const TutorRoutes = () => {
  return (
    <Routes>
         <Route path="/tutor" element={<Dashboard />} />
          <Route path="/tutor/signin" element={<TutorSignIn />} />
          <Route path="/tutor/signup" element={<TutorSignUp />} />
    </Routes>
  )
}

export default TutorRoutes
