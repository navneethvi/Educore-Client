const ResetPass = () => {
  return (
    <>
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
              className="flex-grow py-2 px-3 border w-full border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500 mb-8"
            />
          </div>

          <button className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-4">
            Change Password
          </button>

          {/* <h2 className="text-sm font-semibold font-reem-kufi text-center mt-6 text-gray-600 hover:text-blue-600 cursor-pointer">
            Resend OTP{" "}
          </h2> */}
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
