import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { adminSignin, fetchStudents, fetchTutors } from "./adminActions";
import { ApiResponse } from "../../types/types";
import { number } from "yup";

interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  activity: string;
}

interface Tutor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  activity: string;
}

interface PaginatedData<T> {
  data: T[];
  totalPages: number;
  loading: boolean;
  error: string;
}

interface AdminState {
  adminData: any | null;
  adminToken: string | null;
  success: boolean;
  error: string;
  loading: boolean;
  message: string;
  students: PaginatedData<Student>;
  tutors: PaginatedData<Tutor>;
}

const initialState: AdminState = {
  adminData: null,
  adminToken: null,
  success: false,
  error: "",
  loading: false,
  message: "",
  students: {
    data: [],
    totalPages: 1,
    loading: false,
    error: "",
  },
  tutors: {
    data: [],
    totalPages: 1,
    loading: false,
    error: "",
  },
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
      })

      .addCase(fetchStudents.pending, (state) => {
        state.students.loading = true;
        state.students.error = "";
      })
      .addCase(fetchStudents.fulfilled, (state, action: any) => {
        state.students.loading = false;
        state.students.data = action.payload.students;
        state.students.totalPages = action.payload.totalPages;
      })
      .addCase(fetchStudents.rejected, (state, action: PayloadAction<any>) => {
        state.students.loading = false;
        state.students.error = action.payload || "Failed to fetch students";
      })

      .addCase(fetchTutors.pending, (state) => {
        state.tutors.loading = true;
        state.tutors.error = "";
      })
      .addCase(fetchTutors.fulfilled, (state, action: any) => {
        state.tutors.loading = false;
        state.tutors.data = action.payload.students;
        state.tutors.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTutors.rejected, (state, action: PayloadAction<any>) => {
        state.tutors.loading = false;
        state.tutors.error = action.payload || "Failed to fetch students";
      });
  },
});

export const { resetActions, adminLogout, setAdminData } = adminSlice.actions;

export default adminSlice.reducer;
