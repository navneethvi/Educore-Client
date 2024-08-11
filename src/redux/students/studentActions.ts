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
  studentGoogleSigninService,
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
>("studentSignup", async (data, thunkAPI) => {
  try {
    const response = await studentSignupService(data);
    console.log("in StudentSignup===>", response);
    return response;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const studentVerifyEmail = createAsyncThunk<
  any,
  StudentVerifyOtp,
  { rejectValue: string }
>("studentVerifyEmail", async (data, thunkAPI) => {
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
>("studentResendOtp", async (data, thunkAPI) => {
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
>("setStudentInterests", async (data, thunkAPI) => {
  try {
    const response = await setStudentInterestsService(data);
    console.log("in StudentSetInterests===>", response);
    return response;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const forgotStudentPass = createAsyncThunk<
  any,
  { email: string },
  { rejectValue: string }
>("forgotStudentPass", async (data, thunkAPI) => {
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
>("verifyStudentAccount", async (data, thunkAPI) => {
  try {
    const response = await verifyStudentAccountService(data);
    console.log("in StudentVerifyAcc===>", response);
    return response
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const studentSignin = createAsyncThunk<
  any,
  SigninData,
  { rejectValue: string }
>("studentSignin", async (data, thunkAPI) => {
  try {
    const response = await studentSigninService(data);
    console.log("in StudentSignin===>", response);
    return response;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const studentGoogleSignin = createAsyncThunk<
any,
{ token: string },
{ rejectValue: string }
>(
  'studentGoogleSignin',
  async (data: { token: string }, thunkAPI) => {
    try {
      const response = await studentGoogleSigninService(data);
      console.log("in StudentGoogleSignin===>", response);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const studentResetPass = createAsyncThunk<
  any,
  StudentResetPassData,
  { rejectValue: string }
>("studentResetPass", async (data, thunkAPI) => {
  try {
    const response = await studentResetPassService(data);
    console.log("in StudentResetPass===>", response);
    return response.data;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});
