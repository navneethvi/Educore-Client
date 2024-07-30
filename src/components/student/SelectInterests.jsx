import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InterestButton from "../common/InterestButton";
import axios from "axios";
import { BASE_URL } from "../../utils/configs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const SelectInterests = () => {
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state.email
  console.log(selectedRequirements);

  useEffect(()=>{
    if(location.state.message){
      toast.success(location.state.message)
    }
  }, [location.state])

  const toggleRequirement = (requirement) => {
    if (selectedRequirements.includes(requirement)) {
      setSelectedRequirements((prev) =>
        prev.filter((item) => item !== requirement)
      );
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
    "Science",
  ];

  const handleAddInterests = async () => {
    if (selectedRequirements.length < 3) {
      alert("Please select at least three interests.");
      return;
    }

    setIsLoading(true)
    navigate('/tutor')
    try {
      await axios.post(`${BASE_URL}/auth/set-interests`, {interests : selectedRequirements, email : email})
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    <ToastContainer/>
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
            <div className="flex justify-center mt-10">
              {!isLoading ? (
                <button
                  type="submit"
                  onClick={handleAddInterests}
                  className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-40"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full"
                >
                  Loading...
                </button>
              )}
            </div>
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
