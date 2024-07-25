import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header-container flex justify-between items-center pl-10 pr-10 pt-4 font-reem-kufi">
        <div className="left-side">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            EDUCORE
          </h2>
        </div>
        <div className="center flex space-x-12">
          <h3 className="text-lg cursor-pointer hover:text-gray-700">Home</h3>
          <h3 className="text-lg cursor-pointer hover:text-gray-700">About</h3>
          <h3 className="text-lg cursor-pointer hover:text-gray-700">
            Contact
          </h3>
        </div>
        <div className="right-side flex items-center space-x-4">
          <Link to={"/signin"}>
            <h3 className="text-lg cursor-pointer hover:text-gray-700 bg-gradient-to-r font-semibold from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Sign In
            </h3>
          </Link>
          <Link to={'/signin'}>
            <button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-violet-600">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
