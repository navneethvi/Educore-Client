import '../../../style.css'

const FirstRow = () => {
  return (
    <>
      <div className="first-row-container flex justify-between">
        <div className="left-side pl-20 mt-28">
          <h1 className="text-8xl">
            <span className="block font-reem-kufi text-gray-700">
              Embark on a
            </span>
            <span className="block font-reem-kufi text-gray-700 mt-6">
              Journey of
            </span>
            <span className="block font-reem-kufi text-gray-300 mt-6 bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 rounded-br-3xl">
              Knowledge
            </span>
          </h1>
          <p className="w-96 mt-10 text-gray-600 font-medium">
            Join us and discover the limitless posibilities that await as you
            embark on a tranformative quest for learning and personal growth.
          </p>
          <div className="flex mt-4 space-x-6">
            <button className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500">
              START EDUCORE
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500">
              START TEACHING
            </button>
          </div>
        </div>
        <div className="right-side animate-move">
          <img
            src="/src/assets/home-page/home-right.png"
            alt="Description of the image"
            className="w-82 h-66 rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default FirstRow;
