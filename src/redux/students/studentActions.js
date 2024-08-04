import { createAsyncThunk } from "@reduxjs/toolkit";

import studentSignUpService from './studentServices'

export const studentSignup = createAsyncThunk(
  "studentSignup",
  async (data, thunkAPI) => {
    try {
      const response = await studentSignUpService(data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message || error.response.data.error);
    }
  }
);
