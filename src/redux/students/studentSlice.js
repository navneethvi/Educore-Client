import { createSlice } from "@reduxjs/toolkit";
import { studentSignup } from "./studentActions";

const initialState = {
  studentData: null,
  studentToken: null,
  success: false,
  error: "",
  loading: false,
  message: "",
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetActions: (state) => {
      (state.success = false),
        (state.error = ""),
        (state.loading = false),
        (state.message = "");
    },
    studentLogout: (state) => {
      state.studentData = null;
      state.studentToken = null;
      state.success = false;
      state.error = "";
      state.loading = false;
      state.message = "";
    },
    setStudentData: (state, action) => {
      (state.studentData = action.payload?.data),
        (state.studentToken = action.payload?.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(studentSignup.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(studentSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.studentData = action.payload.studentData;
        state.studentToken = action.payload.studentToken;
        state.message = "Signup successful";
      })
      .addCase(studentSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetActions, studentLogout, setStudentData } =
  studentSlice.actions;

export default studentSlice.reducer;
