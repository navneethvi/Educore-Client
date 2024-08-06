import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const StudentProtected = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentToken } = useSelector((state) => state.student);

  useEffect(() => {
    if (!studentToken) {
      navigate("/signin", { replace: true, state: location.state });
      return;
    }
  }, [studentToken]);

  if (studentToken) {
    return children;
  } else {
    return null;
  }
};

export default StudentProtected;
