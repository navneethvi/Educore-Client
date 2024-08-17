import { createAsyncThunk } from "@reduxjs/toolkit";

import { adminSigninService, getStudentsDataService, getTutorsDataService } from "./adminServices";

import { SigninData, AdminResponse, ApiResponse } from "../../types/types";
import axios from "axios";

export const adminSignin = createAsyncThunk<
  AdminResponse,
  SigninData,
  {
    rejectValue: string;
  }
>("adminSignin", async (data, thunkAPI) => {
  try {
    const response = await adminSigninService(data);
    console.log("in AdminSignin===>", response);
    return response;
  } catch (error: any) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message || error.response.data.error);
  }
});

export const fetchStudents = createAsyncThunk<
  ApiResponse<any>,
  { token: string; page: number },
  {
    rejectValue: string;
  }
>("fetchStudents", async ({ token, page }, thunkAPI) => {
  try {
    const response = await getStudentsDataService(token, page);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || error.response?.data?.error
    );
  }
});

export const fetchTutors = createAsyncThunk<
  ApiResponse<any>,
  { token: string; page: number },
  {
    rejectValue: string;
  }
>("fetchTutors", async ({ token, page }, thunkAPI) => {
  try {
    const response = await getTutorsDataService(token, page);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || error.response?.data?.error
    );
  }
});
