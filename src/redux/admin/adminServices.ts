import axios from "axios";

import { BASE_URL } from "../../utils/configs";

import { ApiResponse, CategoriesResponse, Category, SigninData } from "../../types/types";

const adminSigninService = async (data: SigninData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/admin/signin`, data);
    console.log("response in servcixe : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const adminLogoutService = async (token: string) => {
  try {
    console.log(token);

    const response = await axios.post(
      `${BASE_URL}/auth/admin/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

// Update the return type to match the expected response for adding a category
const addCategoryService = async (
  token: string,
  categoryName: string
): Promise<Category> => {
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
    console.log("Response in service:", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

const getCategoriesDataService = async (
  token: string,
  page: number
): Promise<CategoriesResponse> => {
  try {
    console.log("Page in service ==>", page);
    const response = await axios.get(
      `${BASE_URL}/course/get_categories?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response in service:", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
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

const getALlCoursesService = async (
  token: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.get(`${BASE_URL}/course/get_courses`, {
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

const getCourseDetailsService = async (
  token: string,
  id: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.get(`${BASE_URL}/course/course_details/${id}`, {
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

const adminApproveCourseService = async (
  token: string,
  id: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.patch(`${BASE_URL}/course/approve_course/${id}`, {
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
  adminLogoutService,
  getStudentsDataService,
  getTutorsDataService,
  getCategoriesDataService,
  addCategoryService,
  deleteCategoryService,
  toggleBlockTutorService,
  toggleBlockStudentService,
  getALlCoursesService,
  getCourseDetailsService,
  adminApproveCourseService
};
