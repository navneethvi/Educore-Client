import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { adminSignin } from "./adminActions";

interface AdminState {
  adminData: any | null;
  adminToken: string | null;
  success: boolean;
  error: string;
  loading: boolean;
  message: string;
}

const initialState: AdminState = {
  adminData: null,
  adminToken: null,
  success: false,
  error: "",
  loading: false,
  message: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetActions: (state) => {
      state.success = false;
      state.error = "";
      state.loading = false;
      state.message = "";
    },
    adminLogout: (state) => {
      state.adminData = null;
      state.adminToken = null;
      state.success = false;
      state.error = "";
      state.loading = false;
      state.message = "";
    },
    setAdminData: (
      state,
      action: PayloadAction<{ data: any; token: string }>
    ) => {
      (state.adminData = action.payload?.data),
        (state.adminToken = action.payload?.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminSignin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        adminSignin.fulfilled,
        (state, action: PayloadAction<{ adminData: any }>) => {
          console.log("payload=======>", action.payload);

          state.loading = false;
          state.success = true;
          state.adminData = action.payload.adminData;
          state.adminToken = action.payload.adminData.token;
        }
      )
      .addCase(adminSignin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetActions, adminLogout, setAdminData } = adminSlice.actions;

export default adminSlice.reducer;
