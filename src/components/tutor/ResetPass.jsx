import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

import { tutorResetPass } from "../../redux/tutors/tutorActions";

const ResetPass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setreNewPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, success, error, message } = useSelector(
    (state) => state.tutor
  );

  const { email, otp } = location.state;
  console.log("location.state===>", location.state);

  useEffect(() => {
    if (location.state.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  useEffect(() => {
    if (success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Password Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/tutor/signin", {
        state: { message: "Password Updated Successfully" },
      });
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: message || "An error occurred during password update",
      });
    }
  }, [success, error, message, navigate]);

  const handleUpdatePassword = async () => {
    if (newPassword !== reNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 5) {
      toast.error("Password must be at least 5 characters long");
      return;
    }

    const data = {
        email,
        otp,
        newPassword,
        confirmNewPassword: reNewPassword,
      };
   
    dispatch(tutorResetPass(data))
  };

  return (
    <>
      <ToastContainer />
      <div className="reset-pass-container pl-20 pr-20 flex justify-between items-center">
        <div className="left w-full max-w-lg ml-20">
          <div className="heading">
            <h1 className="text-4xl font-reem-kufi text-gray-600">
              RESET YOUR PASSWORD
            </h1>
            <p className="w-96 mt-4 text-gray-500 font-medium">
              Enter a new password for your account.
            </p>
          </div>
          <div className="mt-6">
            <label
              htmlFor="newpassword"
              className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              className="flex-grow py-2 px-3 border w-full border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500 mb-8"
            />
            <label
              htmlFor="re-newpassword"
              className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
            >
              Re-enter New Password
            </label>
            <input
              type="password"
              id="re-new-password"
              value={reNewPassword}
              onChange={(e) => {
                setreNewPassword(e.target.value);
              }}
              className="flex-grow py-2 px-3 border w-full border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500 mb-8"
            />
          </div>

          {!loading ? (
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-4"
              onClick={handleUpdatePassword}
            >
              Change Password
            </button>
          ) : (
            <button className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-4">
              Loading...
            </button>
          )}
        </div>
        <div className="right mt-6 w-full">
          <img
            src="/src/assets/signin.png"
            alt="Description of the image"
            className="w-82 object-center rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default ResetPass;
