import axios from "axios";

import { BASE_URL } from "../../utils/configs";

const adminSigninService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/admin/signin`, data);
    console.log("response in servcixe : ", response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { adminSigninService };
