import React, { useState } from "react";
import ClassIcon from "@mui/icons-material/Class";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";

interface CourseCardProps {
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  tutorName?: string;
  image?: string;
  thumbnail: string;
  lessonsCount: number;
  duration: string;
  enrollments: number;
  courseId: string;
  handleClick?: (courseId: string) => void;
  onEdit?: (courseId: string) => void;
  onDelete?: (courseId: string) => void;
  isAdmin?: boolean;
  isTutor?: boolean;
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
  onEdit,
  onDelete,
  isAdmin = false,
  isTutor = false,
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  const truncateTitle = (title: string, maxLength: number) => {
    if (!title) return "";
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  const handleCardClick = () => {
    if (handleClick) {
      handleClick(courseId); 
    }
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
        <p className="price text-gray-700 font-reem-kufi text-sm">₹{price}</p>
      </div>
      <h1 className="pl-3 pr-3 font-reem-kufi font-semibold text-md">
        {truncateTitle(title, 23)}
      </h1>
      <div className="p-3">
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
        ) : (
          <div className="mt-1 flex items-center">
            <img
              src={image}
              alt={tutorName}
              className="w-8 h-8 rounded-full mr-2"
            />
            <p>{tutorName}</p>
          </div>
        )}
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
