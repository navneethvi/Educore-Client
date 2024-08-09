import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const TutorProtected = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {tutorToken} = useSelector((state) => state.tutor);

  useEffect(() => {
    if (!tutorToken) {
      navigate("/tutor/signin", { replace: true, state: location.state });
      return;
    }
  }, [tutorToken]);

  if (tutorToken) {
    return children;
  } else {
    return null;
  }
};

export default TutorProtected;
[p'"
  ]