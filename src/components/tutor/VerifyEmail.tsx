import { useEffect, useState, KeyboardEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otpValidationSchema } from "../../validations/otpValidation";
import { useDispatch, useSelector } from "react-redux";
import {
  tutorVerifyEmail,
  tutorResendOtp,
} from "../../redux/tutors/tutorActions";
import { resetActions } from "../../redux/tutors/tutorSlice";

import { RootState, AppDispatch } from "../../store/store";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const email = location.state?.email;

  const { loading, error, success, otpResendError, otpResendSuccess } =
    useSelector((state: RootState) => state.tutor);

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
        state: { message: "Tutor Verified Successfully", email: email },
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
    setIsResendVisible(false); // Hide the Resend OTP button when the timer starts
    const endTime = Date.now() + 60000; // 1 minute
    localStorage.setItem("otpEndTime", endTime.toString());
    setTimer(60);

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setIsResendVisible(true); // Show the Resend OTP button when the timer ends
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  };

  useEffect(() => {
    startNewTimer(); // Start the timer when the component mounts
  }, []);
  
  useEffect(() => {
    if (otpResendSuccess) {
      startNewTimer(); // Start the timer when OTP is resent successfully
    }
  }, [otpResendSuccess]);

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
            setIsResendVisible(true); 
          }
        }, 1000);
        return () => clearInterval(countdown);
      } else {
        setIsResendVisible(true); 
      }
    } else {
      startNewTimer(); 
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (!element.value.match(/^[0-9]*$/)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      event.currentTarget.previousSibling
    ) {
      (event.currentTarget.previousSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const validation = otpValidationSchema.isValidSync({ otp });
    if (!validation) {
      toast.error("Please enter a valid OTP.");
      return;
    }
    dispatch(tutorVerifyEmail({ otp: enteredOtp, email: email }));
  };

  const handleResendOtp = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    dispatch(tutorResendOtp({ email: email }));
    startNewTimer()
  };
  return (
    <>
      <ToastContainer />
      <div className="verify-email-container flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-16 bg-gray-100 min-h-screen">
        <div className="left w-full lg:w-1/2 flex flex-col items-center justify-center">
          <div className="heading text-center mb-6">
            <h1 className="text-3xl lg:text-4xl font-reem-kufi text-gray-600">
              VERIFY YOUR EMAIL
            </h1>
            <p className="mt-4 text-gray-500 font-medium">
              Enter the 4-digit code sent to your email: <br /> {email}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-md p-4">
            <div className="mt-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi"
              >
                Enter OTP
              </label>
              <div className="flex justify-center gap-4 mt-8">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-16 h-12 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi text-center text-xl focus:ring-blue-500 focus:border-blue-500"
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className={`bg-gradient-to-r from-blue-500 to-blue-800 h-12 mt-8 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-2 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          <div className="w-full flex justify-center mt-6">
            <h2 className="text-sm font-semibold font-reem-kufi text-gray-600 hover:text-blue-600 cursor-pointer text-center">
              {timer > 0 ? (
                `Resend OTP in ${timer}s`
              ) : (
                <span onClick={handleResendOtp} className="text-blue-600">
                  Resend OTP
                </span>
              )}
            </h2>
          </div>
        </div>
        <div className="right hidden md:flex md:w-1/2 items-center justify-center mt-6 md:mt-0">
          <img
            src="/src/assets/signup.png"
            alt="Signup Illustration"
            className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg object-cover rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
