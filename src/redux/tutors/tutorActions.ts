import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  tutorResendOtpService,
  tutorSignupService,
  tutorVerifyEmailService,
  tutorSigninService,
  forgotTutorPassService,
  verifyTutorAccountService,
  tutorResetPassService,
  tutorGoogleSigninService,
  tutorLogoutService,
} from "./tutorServices";

import {
  TutorSignupData,
  TutorVerifyOtp,
  SigninData,
  TutorResetPassData,
} from "../../types/types";

const handleThunkError = (error: any, thunkAPI: any) => {
  console.log(error);
  return thunkAPI.rejectWithValue(
    error.message || error.response?.data?.error || "Unknown error"
  );
};

export const tutorSignup = createAsyncThunk<
  any,
  TutorSignupData,
  { rejectValue: string }
>("tutorSignup", async (data, thunkAPI) => {
  try {
    const response = await tutorSignupService(data);
    console.log("in TutorSignup===>", response);
    return response.data;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const tutorVerifyEmail = createAsyncThunk<
  any,
  TutorVerifyOtp,
  { rejectValue: string }
>("tutorVerifyEmail", async (data, thunkAPI) => {
  try {
    const response = await tutorVerifyEmailService(data);
    console.log("in TutorVerifyEmail===>", response);
    return response;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const tutorResendOtp = createAsyncThunk<
  any,
  { email: string },
  { rejectValue: string }
>("tutorResendOtp", async (data, thunkAPI) => {
  try {
    const response = await tutorResendOtpService(data);
    console.log("in TutorResendOtp===>", response);
    return response;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const tutorSignin = createAsyncThunk<
  any,
  SigninData,
  { rejectValue: string }
>("tutorSignin", async (data, thunkAPI) => {
  try {
    const response = await tutorSigninService(data);
    console.log("in TutorSignin===>", response);
    return response;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const forgotTutorPass = createAsyncThunk<
  any,
  { email: string },
  { rejectValue: string }
>("forgotTutorPass", async (data, thunkAPI) => {
  try {
    const response = await forgotTutorPassService(data);
    console.log("in TutorForgotPass===>", response);
    return response;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

export const verifyTutorAccount = createAsyncThunk<
  any,
  { email: string; otp: string },
  { rejectValue: string }
>("verifyTutorAccount", async (data, thunkAPI) => {
  try {
    const response = await verifyTutorAccountService(data);
    console.log("in TutorVerifyAcc===>", response);
    return response;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const tutorGoogleSignin = createAsyncThunk<
  any,
  { token: string },
  { rejectValue: string }
>("tutorGoogleSignin", async (data: { token: string }, thunkAPI) => {
  try {
    const response = await tutorGoogleSigninService(data);
    console.log("in TutorGoogleSignin===>", response);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const tutorResetPass = createAsyncThunk<
  any,
  TutorResetPassData,
  { rejectValue: string }
>("tutorResetPass", async (data, thunkAPI) => {
  try {
    const response = await tutorResetPassService(data);
    console.log("in TutorResetPass===>", response);
    return response;
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});

export const tutorLogout = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("tutorLogout", async (token, thunkAPI) => {
  try {
    await tutorLogoutService(token);
  } catch (error: any) {
    return handleThunkError(error, thunkAPI);
  }
});
