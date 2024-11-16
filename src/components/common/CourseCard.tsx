import React, { useState } from "react";
import ClassIcon from "@mui/icons-material/Class";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import { Button } from "@mui/material"; // Import Button from MUI

interface CourseCardProps {
  title: string;
  category: string;
  thumbnail: string;
  courseId: string;
  handleClick?: (courseId: string) => void;
  price?: number;
  originalPrice?: number;
  tutorName?: string;
  image?: string;
  lessonsCount?: number;
  duration?: string;
  enrollments?: number;
  onEdit?: (courseId: string) => void;
  onDelete?: (courseId: string) => void;
  isAdmin?: boolean;
  isTutor?: boolean;
  handleGoToCourse?: () => void;
  showGoToCourseButton?: boolean; // New prop to control button visibility

}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  category,
  thumbnail,
  courseId,
  handleClick,
  price,
  tutorName,
  image,
  lessonsCount,
  duration,
  enrollments,
  onEdit,
  onDelete,
  isAdmin = false,
  isTutor = false,
  handleGoToCourse,
  showGoToCourseButton = false, // Default to true

}) => {
  const [imageLoading, setImageLoading] = useState(true);

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const handleCardClick = () => {
    if (handleClick) handleClick(courseId);
  };

  return (
    <div
      onClick={() => handleCardClick()}
      className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full sm:w-60 md:w-64 h-auto cursor-pointer transform transition-transform duration-300 hover:scale-105"
    >
      <div className="relative h-36">
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
        {price && (
          <p className="price text-gray-700 font-reem-kufi text-sm">₹{price}</p>
        )}
      </div>
      <h1 className="pl-3 pr-3 font-reem-kufi font-semibold text-md">
        {truncateTitle(title, 23)}
      </h1>
      {isAdmin ? (
        <div className="mt-1 flex justify-center items-center space-x-4">
          <button className="bg-purple-600 text-white text-xs px-3 py-2 rounded-full hover:bg-purple-700 transition duration-300">
            Approve
          </button>
          <button className="bg-red-600 text-white text-xs px-4 py-2 rounded-full hover:bg-red-700 transition duration-300">
            Reject
          </button>
        </div>
      ) : isTutor ? (
        <div className="mt-1 flex justify-center items-center space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit(courseId);
            }}
            className="bg-blue-600 text-white text-xs px-9 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete(courseId);
            }}
            className="bg-red-600 text-white text-xs px-9 py-2 rounded-full hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
        </div>
      ) : tutorName ? (
        <div className="mt-1 flex items-center">
          <img
            src={image}
            alt={tutorName}
            className="w-8 h-8 rounded-full mr-2"
          />
          <p>{tutorName}</p>
        </div>
      ) : null}
      <hr className="my-1 border-gray-400" />
      {(lessonsCount || duration || enrollments) && (
        <div className="pl-3 pr-3 pt-1 pb-2 flex items-center justify-between">
          {lessonsCount && (
            <div className="left flex items-center space-x-1">
              <ClassIcon className="text-gray-400 text-sm" />
              <h3 className="text-gray-500 text-sm">{lessonsCount}</h3>
            </div>
          )}
          {duration && (
            <div className="center flex items-center space-x-1">
              <AccessTimeIcon className="text-gray-400 text-sm" />
              <h3 className="text-gray-500 text-sm">{duration}</h3>
            </div>
          )}
          {enrollments && (
            <div className="right flex items-center space-x-1">
              <SchoolIcon className="text-gray-400 text-sm" />
              <h3 className="text-gray-500 text-sm">{enrollments}</h3>
            </div>
          )}
        </div>
      )}
      {/* Go to Course Button */}
      {showGoToCourseButton && (
        <div className="p-3">
          <button
            onClick={
             handleGoToCourse
            }
            className="bg-violet-600 text-white text-xs px-9 py-2 rounded-full w-full hover:bg-violet-700 transition duration-300"
          >
            Go to course
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
