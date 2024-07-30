import axios from "axios";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BASE_URL } from "../../utils/configs";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;

  useEffect(() => {
    if (location.state.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

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
          if (newRemainingTime === 0) {
            clearInterval(countdown);
          }
        }, 1000);
        return () => clearInterval(countdown);
      }
    } else {
      const endTime = Date.now() + 60000;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredOtp = otp.join("");
    try {
      await axios.post(`${BASE_URL}/auth/verify-otp`, {
        otp: enteredOtp,
        email: email,
      });
      navigate("/select-interests", {
        state: { message: "Student Verified Successfully", email: email },
      });
    } catch (error) {
      setIsLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleResendOtp = async () => {
    await axios.post(`${BASE_URL}/auth/resend-otp`, { email: email });
    const endTime = Date.now() + 60000;
    localStorage.setItem("otpEndTime", endTime);
    setTimer(60);
  };

  return (
    <>
      <ToastContainer />
      <div className="verify-email-container pl-20 pr-20 flex justify-between items-center">
        <div className="left w-full max-w-lg ml-20">
          <div className="heading">
            <h1 className="text-4xl font-reem-kufi text-gray-600">
              RESET YOUR PASSWORD
            </h1>
            <p className="w-96 mt-4 text-gray-500 font-medium">
              Enter 4-digit code that we have sent to your email
              {email}
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
                    className="w-full h-12 border border-gray-500 rounded-lg space-x-10 bg-gray-50 text-gray-800 font-reem-kufi text-center text-xl focus:ring-blue-500 focus:border-blue-500 mb-6"
                  />
                ))}
              </div>
            </div>

            {!isLoading ? (
              <button className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-2">
                Submit
              </button>
            ) : (
              <button className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-2">
                OTP Submitted..
              </button>
            )}
          </form>

          <h2 className="text-sm font-semibold font-reem-kufi text-center mt-6 text-gray-600 hover:text-blue-600 cursor-pointer">
            {timer > 0 ? (
              `Resend OTP in ${timer}s`
            ) : (
              <span onClick={handleResendOtp}>Resend OTP</span>
            )}
          </h2>
        </div>
        <div className="right mt-6 w-full">
          <img
            src="/src/assets/signup.png"
            alt="Description of the image"
            className="w-82 object-center rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
