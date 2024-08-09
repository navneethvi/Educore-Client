import CourseCard from "../CourseCard";
import React from "react";

const SecondRow: React.FC = () => {
  return (
    <>
      <div className="second-row-container p-20">
        <h1 className="text-4xl font-reem-kufi text-gray-600">
          Trending Courses
        </h1>
        <div className="trending-cards mt-8 flex space-x-12">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
        <h1 className="text-4xl font-reem-kufi text-gray-600 mt-20">
          Recent Additions
        </h1>
        <div className="trending-cards mt-8 flex space-x-12">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </>
  );
};

export default SecondRow;
