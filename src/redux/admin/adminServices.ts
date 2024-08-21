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
  page: number,
  searchTerm: string
): Promise<ApiResponse<any>> => {
  try {
    console.log("page in service ==>", page);

    const response = await axios.get(
      `${BASE_URL}/auth/admin/get_students?page=${page}&searchTerm=${searchTerm}`,
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
  page: number,
  searchTerm: string
): Promise<ApiResponse<any>> => {
  try {
    console.log("page in service ==>", page);

    const response = await axios.get(
      `${BASE_URL}/auth/admin/get_tutors?page=${page}&searchTerm=${searchTerm}`,
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

const getCategoriesDataService = async (
  token: string,
  page: number
): Promise<ApiResponse<any>> => {
  try {
    console.log("page in service ==>", page);

    const response = await axios.get(
      `${BASE_URL}/course/get_categories?page=${page}`,
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

const addCategoryService = async (
  token: string,
  categoryName: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/course/add_category`,
      { name: categoryName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response in service: ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

const deleteCategoryService = async (
  token: string,
  category_id: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/course/delete_category`,
      { _id: category_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response in service: ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

const toggleBlockTutorService = async (
  token: string,
  tutorId: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/auth/tutor/${tutorId}/block`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response in service: ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

const toggleBlockStudentService = async (
  token: string,
  studentId: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.patch(`${BASE_URL}/auth/${studentId}/block`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response in service: ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

export {
  adminSigninService,
  getStudentsDataService,
  getTutorsDataService,
  getCategoriesDataService,
  addCategoryService,
  deleteCategoryService,
  toggleBlockTutorService,
  toggleBlockStudentService,
};
