import { createAsyncThunk } from "@reduxjs/toolkit";

import { adminSigninService } from "./adminServices";

import { SigninData, AdminResponse } from "../../types/types";

export const adminSignin = createAsyncThunk<
AdminResponse,
SigninData,
{
  rejectValue: string;
}
>(
  "adminSignin",
  async (data, thunkAPI) => {
    try {
      const response = await adminSigninService(data);
      console.log("in AdminSignin===>", response);
      return response;
    } catch (error : any) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.message || error.response.data.error
      );
    }
  }
);
