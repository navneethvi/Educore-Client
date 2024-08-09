import axios from "axios";

import { BASE_URL } from "../../utils/configs";

import { SigninData } from "../../types/types";

const adminSigninService = async (data : SigninData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/admin/signin`, data);
    console.log("response in servcixe : ", response);
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};

export { adminSigninService };
