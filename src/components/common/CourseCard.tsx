import React, { useState } from "react";
import ClassIcon from "@mui/icons-material/Class";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";

interface CourseCardProps {
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  tutorName: string;
  image: string;
  thumbnail: string;
  lessonsCount: number;
  duration: string;
  enrollments: number;
  courseId: string;
  handleClick: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  category,
  price,
  originalPrice,
  tutorName,
  image,
  thumbnail,
  lessonsCount,
  duration,
  enrollments,
  courseId,
  handleClick,
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div
      onClick={() => handleClick(courseId)}
      className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full sm:w-60 md:w-64 h-auto cursor-pointer transform transition-transform duration-300 hover:scale-105"
    >
      <div className="relative h-36"> {/* Set a fixed height for the image container */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-t-lg" />
        )}
        <img
          src={thumbnail}
          alt="Course Thumbnail"
          className={`w-full h-full object-cover rounded-t-lg transition-opacity duration-500 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setImageLoading(false)}
        />
      </div>
      <div className="p-3 flex justify-between items-center">
        <h2 className="category text-sm font-semibold text-gray-800 font-reem-kufi">
          {category}
        </h2>
        <p className="price text-gray-700 font-reem-kufi text-sm">₹{price}</p>
      </div>
      <h1 className="pl-3 pr-3 font-reem-kufi font-semibold text-md">{title}</h1>
      <div className="p-3 flex items-center">
        <img
          src={image}
          alt="tutor-profile"
          className="w-6 rounded-full"
        />
        <p className="price text-gray-500 font-reem-kufi text-sm pl-2">
          {tutorName}
        </p>
        <p className="review text-gray-500 text-xs pl-14">
          ({enrollments} Reviews)
        </p>
      </div>
      <hr className="my-1 border-gray-400" />
      <div className="pl-3 pr-3 pt-1 pb-2 flex items-center justify-between">
        <div className="left flex items-center space-x-1">
          <ClassIcon className="text-gray-400 text-sm" />
          <h3 className="text-gray-500 text-sm">{lessonsCount}</h3>
        </div>
        <div className="center flex items-center space-x-1">
          <AccessTimeIcon className="text-gray-400 text-sm" />
          <h3 className="text-gray-500 text-sm">{duration}</h3>
        </div>
        <div className="right flex items-center space-x-1">
          <SchoolIcon className="text-gray-400 text-sm" />
          <h3 className="text-gray-500 text-sm">{enrollments}</h3>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
