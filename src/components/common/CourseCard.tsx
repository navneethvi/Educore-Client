import ClassIcon from "@mui/icons-material/Class";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import React from "react";

const CourseCard: React.FC = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full sm:w-60 md:w-64 h-auto cursor-pointer transform transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src="/src/assets/home-page/course-thumb.png"
          alt="Course Thumbnail"
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>
      <div className="p-3 flex justify-between items-center">
        <h2 className="category text-sm font-semibold text-gray-800 font-reem-kufi">
          Development
        </h2>
        <p className="price text-gray-700 font-reem-kufi text-sm">
          <span className="text-gray-400 line-through text-xs">₹3999</span>{" "}
          ₹2999
        </p>
      </div>
      <h1 className="pl-3 pr-3 font-reem-kufi font-semibold text-md">
        Learning Javascript With Imagination
      </h1>
      <div className="p-3 flex items-center">
        <img
          src="/src/assets/home-page/tutor-profile.jpeg"
          alt="tutor-profile"
          className="w-6 rounded-full"
        />
        <p className="price text-gray-500 font-reem-kufi text-sm pl-2">
          Navaneeth V
        </p>
        <p className="review text-gray-500 text-xs pl-8">
          (4.3 Reviews)
        </p>
      </div>
      <hr className="my-1 border-gray-400" />
      <div className="pl-3 pr-3 pt-1 pb-2 flex items-center justify-between">
        <div className="left flex items-center space-x-1">
          <ClassIcon className="text-gray-400 text-sm" />
          <h3 className="text-gray-500 text-sm">02</h3>
        </div>
        <div className="center flex items-center space-x-1">
          <AccessTimeIcon className="text-gray-400 text-sm" />
          <h3 className="text-gray-500 text-sm">2h 12m</h3>
        </div>
        <div className="right flex items-center space-x-1">
          <SchoolIcon className="text-gray-400 text-sm" />
          <h3 className="text-gray-500 text-sm">202</h3>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
