import ClassIcon from "@mui/icons-material/Class";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import React from "react";

const CourseCard: React.FC = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full sm:w-72 md:w-80 h-auto cursor-pointer transform transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src="/src/assets/home-page/course-thumb.png"
          alt="Course Thumbnail"
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4 flex justify-between items-center">
        <h2 className="category text-md font-semibold text-gray-800 font-reem-kufi">
          Development
        </h2>
        <p className="price text-gray-700 font-reem-kufi text-semibold">
          <span className="text-gray-400 line-through text-xs">₹3999</span>{" "}
          ₹2999
        </p>
      </div>
      <h1 className="pl-4 pr-4 font-reem-kufi font-semibold text-lg">
        Learning Javascript With Imagination
      </h1>
      <div className="p-4 flex items-center">
        <img
          src="/src/assets/home-page/tutor-profile.jpeg"
          alt="tutor-profile"
          className="w-8 rounded-full"
        />
        <p className="price text-gray-500 font-reem-kufi text-semibold pl-3">
          Navaneeth V
        </p>
        <p className="review text-gray-500 text-sm pl-12">
          (4.3 Reviews)
        </p>
      </div>
      <hr className="my-1 border-gray-400" />
      <div className="pl-4 pr-4 pt-1 pb-2 flex items-center justify-between">
        <div className="left flex items-center space-x-2">
          <ClassIcon className="text-gray-400 font-normal" />
          <h3 className="text-gray-500">02</h3>
        </div>
        <div className="center flex items-center space-x-2">
          <AccessTimeIcon className="text-gray-400 font-normal" />
          <h3 className="text-gray-500">2h 12m</h3>
        </div>
        <div className="right flex items-center space-x-2">
          <SchoolIcon className="text-gray-400 font-normal" />
          <h3 className="text-gray-500">202</h3>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
