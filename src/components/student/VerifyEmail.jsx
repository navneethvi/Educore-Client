import { useState } from "react";

const VerifyEmail = () => {
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
      <div className="verify-email-container pl-20 pr-20 flex justify-between items-center">
        <div className="left w-full max-w-lg ml-20">
          <div className="heading">
            <h1 className="text-4xl font-reem-kufi text-gray-600">
              RESET YOUR PASSWORD
            </h1>
            <p className="w-96 mt-4 text-gray-500 font-medium">
              Enter 4-digit code that we have sent to your email
              navaneethvinod27@gmail.com
            </p>
          </div>
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
                className="w-full h-12 border border-gray-500 rounded-lg space-x-10  bg-gray-50 text-gray-800 font-reem-kufi text-center text-xl  focus:ring-blue-500 focus:border-blue-500 mb-6"
              />
            ))}
          </div>
          </div>

          <button className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-2">
            Submit
          </button>

          <h2 className="text-sm font-semibold font-reem-kufi text-center mt-6 text-gray-600 hover:text-blue-600 cursor-pointer">
            Resend OTP{" "}
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
