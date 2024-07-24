import ReviewCard from "../ReviewCard";

const FourthRow = () => {
  return (
    <>
      <div className="review-card-container p-20">
        <h1 className="text-4xl font-reem-kufi text-gray-600">
          Latest Reviews
        </h1>
        <div className="cards flex justify-between mt-10 space-x-6">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
        </div>
      </div>
    </>
  );
};

export default FourthRow;
