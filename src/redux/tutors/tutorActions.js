import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  tutorResendOtpService,
  tutorSignupService,
  tutorVerifyEmailService,
  tutorSigninService,
  forgotTutorPassService,
  verifyTutorAccountService,
  tutorResetPassService
} from "./tutorServices";

export const tutorSignup = createAsyncThunk(
  "tutorSignup",
  async (data, thunkAPI) => {
    try {
      const response = await tutorSignupService(data);
      console.log("in TutorSignup===>", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);

export const tutorVerifyEmail = createAsyncThunk(
  "tutorVerifyEmail",
  async (data, thunkAPI) => {
    try {
      const response = await tutorVerifyEmailService(data);
      console.log("in TutorVerifyEmail===>", response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);

export const tutorResendOtp = createAsyncThunk(
  "tutorResendOtp",
  async (data, thunkAPI) => {
    try {
      const response = await tutorResendOtpService(data);
      console.log("in TutorResendOtp===>", response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);

export const tutorSignin = createAsyncThunk(
  "tutorSignin",
  async (data, thunkAPI) => {
    try {
      const response = await tutorSigninService(data);
      console.log("in TutorSignin===>", response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);

export const forgotTutorPass = createAsyncThunk(
    "forgotTutorPass",
    async (data, thunkAPI) => {
      try {
        const response = await forgotTutorPassService(data);
        console.log("in TutorForgotPass===>", response);
        return response;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(
          error.message || error.response.data.error
        );
      }
    }
  );

  export const verifyTutorAccount = createAsyncThunk(
    "verifyTutorAccount",
    async (data, thunkAPI) => {
      try {
        const response = await verifyTutorAccountService(data);
        console.log("in TutorVerifyAcc===>", response);
        return response;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(
          error.message || error.response.data.error
        );
      }
    }
  );

  export const tutorResetPass = createAsyncThunk(
    "tutorResetPass",
    async (data, thunkAPI) => {
      try {
        const response = await tutorResetPassService(data);
        console.log("in TutorResetPass===>", response);
        return response;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(
          error.message || error.response.data.error
        );
      }
    }
  );