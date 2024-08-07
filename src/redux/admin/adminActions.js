import { createAsyncThunk } from "@reduxjs/toolkit";

import { adminSigninService } from "./adminServices";

export const adminSignin = createAsyncThunk(
  "adminSignin",
  async (data, thunkAPI) => {
    try {
      const response = await adminSigninService(data);
      console.log("in AdminSignin===>", response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);
