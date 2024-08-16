import ReviewCard from "../ReviewCard";
import React from "react";

const FourthRow: React.FC = () => {
  return (
    <>
      <div className="review-card-container px-6 md:px-20 py-10">
        <h1 className="text-3xl md:text-4xl font-reem-kufi text-gray-600">Latest Reviews</h1>
        <div className="cards mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </>
  );
};


export default FourthRow;
