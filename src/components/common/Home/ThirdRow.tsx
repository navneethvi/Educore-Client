import CategoryCard from "../CategoryCard";

import React from "react";

const ThirdRow: React.FC = () => {
  return (
    <div className="third-row-container pl-20 pr-20 pb-10">
      <h1 className="text-4xl font-reem-kufi text-gray-600">
        Trending Categories
      </h1>
      <div className="trending-courses mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
      <p className="text-center pt-10 text-blue-600 cursor-pointer">View more..</p>
    </div>
  );
};

export default ThirdRow;

