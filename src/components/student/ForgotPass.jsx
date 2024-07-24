/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

const ForgotPass = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

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

  return (
    <>
      <div className="signup-container flex pl-20 pr-20 pt-10  justify-between space-x-28 items-center">
        <div className="left w-full max-w-lg ml-20">
          <div className="heading">
            <h1 className="text-4xl font-reem-kufi text-gray-600">
              RECOVER YOUR ACCOUNT
            </h1>
            <p className="w-96 mt-4 text-gray-500 font-medium">
              We will send you an email with instructions to reset your
              password.
            </p>
          </div>
          <div className="mt-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
            >
              Email
            </label>
            <div className="flex justify-between items-center space-x-4 mb-8">
              <input
                type="email"
                id="email"
                className="flex-grow py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-gradient-to-r from-blue-500 to-blue-800 h-11 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-28">
                Submit
              </button>
            </div>
          </div>

          <label
            htmlFor="otp"
            className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
          >
            OTP
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
                className="w-full h-12 border border-gray-500 rounded-lg space-x-10  bg-gray-50 text-gray-800 font-reem-kufi text-center text-xl  focus:ring-blue-500 focus:border-blue-500 mb-6"
              />
            ))}
          </div>

          <button className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-4">
            Submit
          </button>

          <h2 className="text-sm font-semibold font-reem-kufi text-center mt-6 text-gray-600 hover:text-blue-600 cursor-pointer">
            Resend OTP{" "}
          </h2>
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

export default ForgotPass;