import { useState } from "react";

import InterestButton from "../common/InterestButton";

const SelectInterests = () => {
  const [selectedRequirements, setSelectedRequirements] = useState([]);

  const toggleRequirement = (requirement) => {
    if (selectedRequirements.includes(requirement)) {
        setSelectedRequirements((prev) => prev.filter((item) => item !== requirement));
      } else if (selectedRequirements.length < 3) {
        setSelectedRequirements((prev) => [...prev, requirement]);
      }
  };

  const isSelected = (requirement) =>
    selectedRequirements.includes(requirement);

  const interests = [
    "Development",
    "Design",
    "Marketing",
    "Data Science",
    "Business",
    "Science"
  ];

  return (
    <>
      <div className="select-interests-container p-20 flex justify-between items-center">
        <div className="left">
          <div className="heading mb-8">
            <h1 className="text-4xl font-reem-kufi text-gray-600">
              SELECT UPTO 3 INTERESTS
            </h1>
            <p className="w-96 mt-4 text-gray-500 font-medium">
              Help us personalize your learning experience by choosing at least
              three interests.
            </p>
          </div>
          <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {interests.map((interest) => (
              <InterestButton
                key={interest}
                interest={interest}
                isSelected={isSelected}
                toggleRequirement={toggleRequirement}
              />
            ))}
          </ul>
        </div>
        </div>
        <div className="right">
          <img
            src="/src/assets/interests.png"
            alt="Description of the image"
            className="w-82 object-center rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default SelectInterests;
