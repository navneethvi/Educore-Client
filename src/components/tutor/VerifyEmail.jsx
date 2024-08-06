import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { tutorVerifyEmail, tutorResendOtp } from "../../redux/tutors/tutorActions";
import { resetActions } from "../../redux/tutors/tutorSlice";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = location.state?.email;

  const { loading, error, success, otpResendError, otpResendSuccess } =
    useSelector((state) => state.tutor);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  useEffect(() => {
    if (error) {
      toast.error(error || "Error occurred.");
      dispatch(resetActions());
    } else if (success) {
      dispatch(resetActions());
      navigate("/tutor/dashboard", {
        state: { message: "Student Verified Successfully", email: email },
      });
    }
  }, [error, success, navigate, email, dispatch]);

  useEffect(() => {
    if (otpResendError) {
      toast.error(otpResendError || "Failed to resend OTP.");
    } else if (otpResendSuccess) {
      toast.success("OTP has been resent successfully.");
      startNewTimer();
    }
  }, [otpResendError, otpResendSuccess]);

  const startNewTimer = () => {
    const endTime = Date.now() + 60000; // 1 minute
    localStorage.setItem("otpEndTime", endTime);
    setTimer(60);

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  };

  useEffect(() => {
    const storedEndTime = localStorage.getItem("otpEndTime");
    if (storedEndTime) {
      const endTime = parseInt(storedEndTime, 10);
      const currentTime = Date.now();
      const remainingTime = Math.max(
        Math.floor((endTime - currentTime) / 1000),
        0
      );
      setTimer(remainingTime);

      if (remainingTime > 0) {
        const countdown = setInterval(() => {
          const newRemainingTime = Math.max(
            Math.floor((endTime - Date.now()) / 1000),
            0
          );
          setTimer(newRemainingTime);
          if (newRemainingTime <= 0) {
            clearInterval(countdown);
          }
        }, 1000);
        return () => clearInterval(countdown);
      }
    } else {
      startNewTimer();
    }
  }, []);

  const handleChange = (element, index) => {
    if (!element.value.match(/^[0-9]*$/)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      event.target.previousSibling
    ) {
      event.target.previousSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    dispatch(tutorVerifyEmail({ otp: enteredOtp, email: email }));
  };

  const handleResendOtp = (e) => {
    e.preventDefault();
    dispatch(tutorResendOtp({ email: email }));
  };

  return (
    <>
      <ToastContainer />
      <div className="verify-email-container pl-20 pr-20 flex justify-between items-center">
        <div className="left w-full max-w-lg ml-20">
          <div className="heading">
            <h1 className="text-4xl font-reem-kufi text-gray-600">
              VERIFY YOUR EMAIL
            </h1>
            <p className="w-96 mt-4 text-gray-500 font-medium">
              Enter the 4-digit code sent to your email: {email}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mt-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
              >
                Enter OTP
              </label>
              <div className="flex justify-center space-x-4 mt-4">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full h-12 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi text-center text-xl focus:ring-blue-500 focus:border-blue-500 mb-6"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={`bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-2 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          <h2 className="text-sm font-semibold font-reem-kufi text-center mt-6 text-gray-600 hover:text-blue-600 cursor-pointer">
            {timer > 0 ? (
              `Resend OTP in ${timer}s`
            ) : (
              <span onClick={handleResendOtp} className="text-blue-600">
                Resend OTP
              </span>
            )}
          </h2>
        </div>
        <div className="right mt-6 w-full">
          <img
            src="/src/assets/signup.png"
            alt="Signup Illustration"
            className="w-82 object-center rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
