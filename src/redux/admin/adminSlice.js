import { createSlice } from "@reduxjs/toolkit";

import { adminSignin } from "./adminActions";

const initialState = {
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
    setAdminData: (state, action) => {
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
      .addCase(adminSignin.fulfilled, (state, action) => {
        console.log("payload=======>", action.payload);
        
        state.loading = false;
        state.success = true;
        state.adminData = action.payload.adminData;
        state.adminToken = action.payload.adminData.token;
      })
      .addCase(adminSignin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetActions, adminLogout, setAdminData } = adminSlice.actions;

export default adminSlice.reducer;
