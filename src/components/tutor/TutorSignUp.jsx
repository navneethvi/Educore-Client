/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom"

const TutorSignUp = () => {
  return (
    <>
       <div className="signup-container flex pl-20 pr-20 pt-10  justify-between space-x-28 items-center">
        <div className="left w-full max-w-lg ml-20">
          <div className="heading">
            <h1 className="text-4xl font-reem-kufi text-gray-600">
            WELCOME TO EDUCORE 🎓
            </h1>
            <p className="w-96 mt-4 text-gray-500 font-medium">
            Share Your Knowledge, Inspire the Future
            </p>
          </div>
          <div className="mt-6">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
            >
              Phone No
            </label>
            <input
              type="text"
              id="phone"
              className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
             <label
              htmlFor="cpassword"
              className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
          </div>
         
          <button className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-4">
            Sign Up
          </button>

        <Link to={'/tutor/signin'}>
        <h2 className="text-sm font-semibold font-reem-kufi text-center mt-6 text-gray-600 hover:text-blue-600 cursor-pointer">
            Already have an account?{" "}
            <span className="text-blue-600">Sign In</span>
          </h2>
        </Link>
        </div>
        <div className="right mt-6">
          <img
            src="/src/assets/signup.png"
            alt="Description of the image"
            className="w-82 object-center rounded-lg"
          />
        </div>
      </div>
    </>
  )
}

export default TutorSignUp
