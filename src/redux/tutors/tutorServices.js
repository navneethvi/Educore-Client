import axios from "axios";

import { BASE_URL } from "../../utils/configs";

const tutorSignupService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/tutor/signup`, data);
    console.log("response in service : ", response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const tutorVerifyEmailService = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tutor/verify-otp`,
      data
    );
    console.log("response in service : ", response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const tutorResendOtpService = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tutor/resend-otp`,
      data
    );
    console.log("response in service : ", response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const tutorSigninService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/tutor/signin`, data);
    console.log("response in service : ", response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const forgotTutorPassService = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tutor/recover-account`,
      data
    );
    console.log("response in service : ", response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const verifyTutorAccountService = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tutor/verify-account`,
      data
    );
    console.log("response in service : ", response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const tutorResetPassService = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tutor/update-password`,
      data
    );
    console.log("response in service : ", response);
    return response.data;
  } catch (error) {
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
