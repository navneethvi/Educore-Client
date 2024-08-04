import axios from "axios";
import { BASE_URL } from "../../utils/configs";

const studentSignupService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data; // Throwing the error to be caught by the thunk
  }
};

export default studentSignupService;
