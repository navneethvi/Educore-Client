import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage'
import StudentRoutes from "./routes/StudentRoutes";
import TutorRoutes from "./routes/TutorRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<StudentRoutes />} />
          <Route path="/tutor/*" element={<TutorRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
