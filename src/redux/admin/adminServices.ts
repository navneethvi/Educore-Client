import axios from "axios";

import { BASE_URL } from "../../utils/configs";

import { ApiResponse, SigninData } from "../../types/types";

const adminSigninService = async (data: SigninData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/admin/signin`, data);
    console.log("response in servcixe : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getStudentsDataService = async (
  token: string,
  page: number
): Promise<ApiResponse<any>> => {
  try {
    console.log("page in service ==>", page);
    
    const response = await axios.get(
      `${BASE_URL}/auth/admin/get_students?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response in service: ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getTutorsDataService = async (
  token: string,
  page: number
): Promise<ApiResponse<any>> => {
  try {
    console.log("page in service ==>", page);
    
    const response = await axios.get(
      `${BASE_URL}/auth/admin/get_tutors?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response in service: ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export { adminSigninService, getStudentsDataService, getTutorsDataService };
