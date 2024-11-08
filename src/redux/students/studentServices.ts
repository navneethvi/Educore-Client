import axios from "axios";
import { BASE_URL } from "../../utils/configs";

import {
  StudentSignupData,
  SigninData,
  ApiResponse,
  StudentVerifyOtp,
  StudentResendOtp,
  SetStudentInterestsPayload,
  StudentResetPassData,
} from "../../types/types";
import { TokenResponse } from "@react-oauth/google";

const studentSignupService = async (
  data: StudentSignupData
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post<ApiResponse<any>>(
      `${BASE_URL}/auth/signup`,
      data
    );
    console.log("response in servcixe : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const studentVerifyEmailService = async (
  data: StudentVerifyOtp
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post<ApiResponse<any>>(
      `${BASE_URL}/auth/verify-otp`,
      data
    );
    console.log("response in servcixe : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const studentResendOtpService = async (
  data: StudentResendOtp
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post<ApiResponse<any>>(
      `${BASE_URL}/auth/resend-otp`,
      data
    );
    console.log("response in servcixe : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const setStudentInterestsService = async (
  data: SetStudentInterestsPayload
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post<ApiResponse<any>>(
      `${BASE_URL}/auth/set-interests`,
      data
    );
    console.log("response in servce : ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const forgotStudentPassService = async (data: {
  email: string;
}): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post<ApiResponse<any>>(
      `${BASE_URL}/auth/recover-account`,
      data
    );
    console.log("response in servce : ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const verifyStudentAccountService = async (data: {
  email: string;
  otp: string;
}): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post<ApiResponse<any>>(
      `${BASE_URL}/auth/verify-account`,
      data
    );
    console.log("response in servce : ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const studentSigninService = async (
  data: SigninData
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post<ApiResponse<any>>(
      `${BASE_URL}/auth/signin`,
      data
    );
    console.log("response in servce : ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const studentGoogleSigninService = async (data: { token: string }) => {
  try {
    const response = await axios.post<{ message: string }>(
      `${BASE_URL}/auth/google`,
      data
    );
    console.log("response in service : ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const studentResetPassService = async (
  data: StudentResetPassData
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post<ApiResponse<any>>(
      `${BASE_URL}/auth/update-password`,
      data
    );
    console.log("response in servce : ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const studentLogoutService = async (
  token: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response in servce : ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

  const studentFetchCoursesService = async (
    token: string,
    limit: number, 
    offset: number,
    searchTerm: string,
    categories: string[],
    sort: string
  ) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/course/fetch_courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: limit, 
            offset: offset,
            searchTerm: searchTerm,
            categories: categories,
            sort: sort
          }
        }
      );
      return response.data
    } catch (error: any) {
      throw error.response;
    }
  };

export {
  studentSignupService,
  studentVerifyEmailService,
  studentResendOtpService,
  setStudentInterestsService,
  forgotStudentPassService,
  verifyStudentAccountService,
  studentSigninService,
  studentGoogleSigninService,
  studentResetPassService,
  studentLogoutService,
  studentFetchCoursesService
};
