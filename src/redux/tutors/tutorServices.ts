import axios from "axios";

import { BASE_URL } from "../../utils/configs";

import {
  ApiResponse,
  TutorSignupData,
  TutorVerifyOtp,
  SigninData,
  TutorResetPassData,
} from "../../types/types";

const tutorSignupService = async (
  data: TutorSignupData
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post<ApiResponse<any>>(
      `${BASE_URL}/auth/tutor/signup`,
      data
    );
    console.log("response in service : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const tutorVerifyEmailService = async (data: TutorVerifyOtp) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tutor/verify-otp`,
      data
    );
    console.log("response in service : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const tutorResendOtpService = async (data: {
  email: string;
}): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tutor/resend-otp`,
      data
    );
    console.log("response in service : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const tutorSigninService = async (
  data: SigninData
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/tutor/signin`, data);
    console.log("response in service : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const forgotTutorPassService = async (data: {
  email: string;
}): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tutor/recover-account`,
      data
    );
    console.log("response in service : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const verifyTutorAccountService = async (data: {
  email: string;
  otp: string;
}): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tutor/verify-account`,
      data
    );
    console.log("response in service : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const tutorResetPassService = async (
  data: TutorResetPassData
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tutor/update-password`,
      data
    );
    console.log("response in service : ", response);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export {
  tutorSignupService,
  tutorVerifyEmailService,
  tutorResendOtpService,
  tutorSigninService,
  forgotTutorPassService,
  verifyTutorAccountService,
  tutorResetPassService,
};
