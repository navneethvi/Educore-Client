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

export const studentSignup = createAsyncThunk(
  "studentSignup",
  async (data, thunkAPI) => {
    try {
      const response = await studentSignupService(data);
      console.log("in StudentSignup===>", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);

export const studentVerifyEmail = createAsyncThunk(
  "studentVerifyEmail",
  async (data, thunkAPI) => {
    try {
      const response = await studentVerifyEmailService(data);
      console.log("in StudentVerifyEmail===>", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);

export const studentResendOtp = createAsyncThunk(
  "studentResendOtp",
  async (data, thunkAPI) => {
    try {
      const response = await studentResendOtpService(data);
      console.log("in StudentResendOtp===>", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);

export const setStudentInterests = createAsyncThunk(
  "setStudentInterests",
  async (data, thunkAPI) => {
    try {
      const response = await setStudentInterestsService(data);
      console.log("in StudentSetInterests===>", response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);

export const forgotStudentPass = createAsyncThunk(
  "forgotStudentPass",
  async (data, thunkAPI) => {
    try {
      const response = await forgotStudentPassService(data);
      console.log("in StudentForgotPass===>", response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);

export const verifyStudentAccount = createAsyncThunk(
  "verifyStudentAccount",
  async (data, thunkAPI) => {
    try {
      const response = await verifyStudentAccountService(data);
      console.log("in StudentVerifyAcc===>", response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);

export const studentSignin = createAsyncThunk(
  "studentSignin",
  async (data, thunkAPI) => {
    try {
      const response = await studentSigninService(data);
      console.log("in StudentSignin===>", response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);

export const studentResetPass = createAsyncThunk(
  "studentResetPass",
  async (data, thunkAPI) => {
    try {
      const response = await studentResetPassService(data);
      console.log("in StudentResetPass===>", response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);