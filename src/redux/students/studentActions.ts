import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  studentVerifyEmailService,
  studentResendOtpService,
  studentSignupService,
  setStudentInterestsService,
  forgotStudentPassService,
  verifyStudentAccountService,
  studentSigninService,
  studentResetPassService,
} from "./studentServices";

import {
  SetStudentInterestsPayload,
  SigninData,
  StudentResendOtp,
  StudentResetPassData,
  StudentSignupData,
  StudentVerifyOtp,
} from "../../types/types";

const handleThunkError = (error: any, thunkAPI: any) => {
  console.log(error);
  return thunkAPI.rejectWithValue(error.message || error.response?.data?.error || "Unknown error");
};

export const studentSignup = createAsyncThunk<
  any,
  StudentSignupData,
  { rejectValue: string }
>("student/signup", async (data, thunkAPI) => {
  try {
    const response = await studentSignupService(data);
    console.log("in StudentSignup===>", response);
    return response.data;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const studentVerifyEmail = createAsyncThunk<
  any,
  StudentVerifyOtp,
  { rejectValue: string }
>("student/verifyEmail", async (data, thunkAPI) => {
  try {
    const response = await studentVerifyEmailService(data);
    console.log("in StudentVerifyEmail===>", response);
    return response.data;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const studentResendOtp = createAsyncThunk<
  any,
  StudentResendOtp,
  { rejectValue: string }
>("student/resendOtp", async (data, thunkAPI) => {
  try {
    const response = await studentResendOtpService(data);
    console.log("in StudentResendOtp===>", response);
    return response.data;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const setStudentInterests = createAsyncThunk<
  any,
  SetStudentInterestsPayload,
  { rejectValue: string }
>("student/setInterests", async (data, thunkAPI) => {
  try {
    const response = await setStudentInterestsService(data);
    console.log("in StudentSetInterests===>", response);
    return response.data;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const forgotStudentPass = createAsyncThunk<
  any,
  { email: string },
  { rejectValue: string }
>("student/forgotPassword", async (data, thunkAPI) => {
  try {
    const response = await forgotStudentPassService(data);
    console.log("in StudentForgotPass===>", response);
    return response.data;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const verifyStudentAccount = createAsyncThunk<
  any,
  { email: string; otp: string },
  { rejectValue: string }
>("student/verifyAccount", async (data, thunkAPI) => {
  try {
    const response = await verifyStudentAccountService(data);
    console.log("in StudentVerifyAcc===>", response);
    return response.data;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const studentSignin = createAsyncThunk<
  any,
  SigninData,
  { rejectValue: string }
>("student/signin", async (data, thunkAPI) => {
  try {
    const response = await studentSigninService(data);
    console.log("in StudentSignin===>", response);
    return response.data;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const studentResetPass = createAsyncThunk<
  any,
  StudentResetPassData,
  { rejectValue: string }
>("student/resetPassword", async (data, thunkAPI) => {
  try {
    const response = await studentResetPassService(data);
    console.log("in StudentResetPass===>", response);
    return response.data;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});
