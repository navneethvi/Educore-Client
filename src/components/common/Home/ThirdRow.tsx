import CategoryCard from "../CategoryCard";
import React from "react";

const ThirdRow: React.FC = () => {
  return (
    <div className="third-row-container px-6 md:px-20 py-10">
      <h1 className="text-3xl md:text-4xl font-reem-kufi text-gray-600">
        Trending Categories
      </h1>
      <div className="trending-categories mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Render Category Cards */}
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
      <p className="text-center pt-10 text-blue-600 cursor-pointer">
        View more...
      </p>
    </div>
  );
};

export default ThirdRow;
