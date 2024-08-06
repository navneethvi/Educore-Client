import axios from "axios";
import { BASE_URL } from "../../utils/configs";

const studentSignupService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, data);
    console.log("response in servcixe : ", response);
    return response.data;
  } catch (error) {
    throw error.response.data; // Throwing the error to be caught by the thunk
  }
};

const studentVerifyEmailService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp`, data);
    console.log("response in servcixe : ", response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const studentResendOtpService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/resend-otp`, data);
    console.log("response in servcixe : ", response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const setStudentInterestsService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/set-interests`, data);
    console.log("response in servce : ", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const forgotStudentPassService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/recover-account`, data);
    console.log("response in servce : ", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const verifyStudentAccountService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-account`, data);
    console.log("response in servce : ", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const studentSigninService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, data);
    console.log("response in servce : ", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const studentResetPassService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/update-password`, data);
    console.log("response in servce : ", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
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
  studentResetPassService
};
