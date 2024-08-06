import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InterestButton from "../common/InterestButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setStudentInterests } from "../../redux/students/studentActions";


const SelectInterests = () => {
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = location.state.email;
  console.log(selectedRequirements);

  const { loading, success, error } = useSelector((state) => state.student);

  useEffect(() => {
    if (location.state.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  useEffect(() => {
    if (success) {
      toast.success("Interests updated successfully!");
      navigate("/dashboard");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, navigate]);

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

    dispatch(
      setStudentInterests({ interests: selectedRequirements, email: email })
    );
  };

  return (
    <>
      <ToastContainer />
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
              <button
                type="submit"
                onClick={handleAddInterests}
                className={`bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg ${
                  loading
                    ? "cursor-not-allowed opacity-50"
                    : "hover:from-blue-800 hover:to-blue-500"
                } w-40`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
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
