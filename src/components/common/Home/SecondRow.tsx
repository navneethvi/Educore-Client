import CourseCard from "../CourseCard";
import React from "react";

const SecondRow: React.FC = () => {
  return (
    <>
      <div className="second-row-container px-4 md:px-16 py-10">
        <h1 className="text-3xl md:text-4xl font-reem-kufi text-gray-600">
          Trending Courses
        </h1>
        <div className="trending-cards mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
        <h1 className="text-3xl md:text-4xl font-reem-kufi text-gray-600 mt-10 md:mt-20">
          Recent Additions
        </h1>
        <div className="recent-cards mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
