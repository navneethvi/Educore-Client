const FifthRow = () => {
  return (
    <>
      <div className="about-us p-20 flex items-center justify-between">
        <div className="left">
          <h1 className="text-7xl">
          <span className="block font-reem-kufi text-gray-700">
              About Us : Journey
            </span>
            <span className="block font-reem-kufi text-gray-700 mt-6">
              of Empowerment
            </span>
          </h1>
        </div>
        <div className="right flex items-center justify-between">
            <button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-violet-600 mr-20">How it Works?</button>
            <h1 className="font-medium font-reem-kufi text-gray-500 w-80">We are passionate about helping study transformative journey towards achieving their goals.</h1>
        </div>
      </div>
    </>
  );
};

export default FifthRow;
