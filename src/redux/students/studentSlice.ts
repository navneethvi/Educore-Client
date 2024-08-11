import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  studentSignup,
  studentVerifyEmail,
  studentResendOtp,
  setStudentInterests,
  forgotStudentPass,
  verifyStudentAccount,
  studentSignin,
  studentResetPass,
  studentGoogleSignin,
} from "./studentActions";

interface StudentState {
  studentData: any | null;
  studentToken: string | null;
  success: boolean;
  error: string;
  loading: boolean;
  message: string;
  otpResendSuccess: boolean;
  otpResendError: string;
  otpResendLoading: boolean;
  otpVerifySuccess: boolean;
  otpVerifyLoading: boolean;
  otpVerifyError: string;
}

const initialState: StudentState = {
  studentData: null,
  studentToken: null,
  success: false,
  error: "",
  loading: false,
  message: "",
  otpResendSuccess: false,
  otpResendError: "",
  otpResendLoading: false,
  otpVerifySuccess: false,
  otpVerifyLoading: false,
  otpVerifyError: "",
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetActions: (state) => {
      state.success = false;
      state.error = "";
      state.loading = false;
      state.message = "";
      state.otpResendSuccess = false;
      state.otpResendError = "";
      state.otpResendLoading = false;
    },
    studentLogout: (state) => {
      state.studentData = null;
      state.studentToken = null;
      state.success = false;
      state.error = "";
      state.loading = false;
      state.message = "";
    },
    // setStudentData: (
    //   state,
    //   action: PayloadAction<{ data: any; token: string | null }>
    // ) => {
    //   state.studentData = action.payload.data;
    //   state.studentToken = action.payload.studentData.token ?? null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(studentSignup.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(studentSignup.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        studentSignup.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      )

      .addCase(studentVerifyEmail.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(studentVerifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.message = "Student Verified Successfully";
      })
      .addCase(
        studentVerifyEmail.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      )

      .addCase(studentResendOtp.pending, (state) => {
        state.otpResendLoading = true;
        state.otpResendError = "";
      })
      .addCase(studentResendOtp.fulfilled, (state) => {
        state.otpResendLoading = false;
        state.otpResendSuccess = true;
      })
      .addCase(
        studentResendOtp.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.otpResendLoading = false;
          state.otpResendError = action.payload || "Something went wrong";
        }
      )

      .addCase(setStudentInterests.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        setStudentInterests.fulfilled,
        (state, action: PayloadAction<{ studentData: any }>) => {
          console.log("paylooooooooad =========>", action.payload);
          state.loading = false;
          state.success = true;
          state.studentData = action.payload.studentData;
          state.studentToken = action.payload.studentData.token;
          state.message = "Signup successful";
        }
      )
      .addCase(
        setStudentInterests.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      )

      .addCase(forgotStudentPass.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(forgotStudentPass.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        forgotStudentPass.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      )

      .addCase(verifyStudentAccount.pending, (state) => {
        state.otpVerifyLoading = true;
        state.otpVerifyError = "";
      })
      .addCase(verifyStudentAccount.fulfilled, (state) => {
        state.otpVerifyLoading = false;
        state.otpVerifySuccess = true;
      })
      .addCase(
        verifyStudentAccount.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.otpVerifyLoading = false;
          state.otpVerifyError = action.payload || "Something went wrong";
        }
      )

      .addCase(studentSignin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        studentSignin.fulfilled,
        (state, action: PayloadAction<{ studentData: any }>) => {
          console.log("paylooooooooad =========>", action.payload);
          state.loading = false;
          state.success = true;
          state.studentData = action.payload.studentData;
          state.studentToken = action.payload.studentData.token;
          state.message = "Signin successful";
        }
      )
      .addCase(
        studentSignin.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      )

      .addCase(studentGoogleSignin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        studentGoogleSignin.fulfilled,
        (state, action: PayloadAction<{ studentData: any }>) => {
          console.log("paylooooooooad =========>", action.payload);
          state.loading = false;
          state.success = true;
          state.studentData = action.payload.studentData;
          state.studentToken = action.payload.studentData.token;
          state.message = "Signin successful";
        }
      )
      .addCase(
        studentGoogleSignin.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      )

      .addCase(studentResetPass.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(studentResetPass.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        studentResetPass.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const { resetActions, studentLogout } = studentSlice.actions;

export default studentSlice.reducer;
