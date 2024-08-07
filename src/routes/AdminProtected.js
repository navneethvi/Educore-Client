import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AdminProtected = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminToken } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin/signin", { replace: true, state: location.state });
      return;
    }
  }, [adminToken]);

  if (adminToken) {
    return children;
  } else {
    return null;
  }
};

export default AdminProtected;
