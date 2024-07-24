import StarBorderIcon from "@mui/icons-material/StarBorder";

const ReviewCard = () => {
  return (
    <>
      <div className="review-cards border-2 shadow-sm h-auto rounded-lg text-center p-4 hover:shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105">
        <div className="stars mb-4 text-left">
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
        </div>
        <h1 className="font-medium font-reem-kufi text-xl text-left">
          The Name of the Course.....
        </h1>
        <h2 className="font-normal text-sm text-left mb-4">
          As someone who recently completed Docker course offered by Stephen...{" "}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            src="/src/assets/home-page/tutor-profile.jpeg"
            alt="tutor-profile"
            className="w-8 h-8 rounded-full"
          />
          <h2 className="font-normal text-sm mb-0 font-reem-kufi text-gray-500">Navaneeth V</h2>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;